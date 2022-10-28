import * as R from 'ramda';
import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { getBlobFromAssets } from '../../../../services/utils';
import { RhythmListState, State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import TouchMe from '../WorkingMemoryPane/WorkingMemoryForm/TouchMe';
import { setRhythmList } from '../../../../services/rhythmList';
import { Container } from '@mui/material';
import { PITCHES } from '../../../../pitch';
import RhythmRow from './RhythmRow';

const RhythmListPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initialize, setInitialize] = useState(true);
  const [cardIds, setCardIds] = useState<string[]>([]);
  const [gridTemplateColumns, setGridTemplateColumns] = useState('1fr');

  useEffect(() => {
    switch (state.rhythmList.mora) {
      case 2:
        setCardIds([
          'tatta',
          // 'tatax',
          'taata',
          // 'tataa',
          'tanta',
          // 'tatan',
          'tatata',
        ]);
        // setGridTemplateColumns('1fr 1fr');
        break;
      case 3:
        setCardIds([
          'tattata',
          'tatatta',
          'tatatax',
          'tattaa',
          'tattan',
          'taatata',
          'tataata',
          'tatataa',
          'taataa',
          'taatan',
          'tantata',
          'tatanta',
          'tatatan',
          'tantaa',
          'tantan',
          'tatatata',
        ]);
        setGridTemplateColumns('1fr 1fr 1fr 1fr 1fr');
        break;
      default:
        setCardIds(['ta', 'taa', 'tan', 'tata']);
        setGridTemplateColumns('1fr');
    }
  }, [state.rhythmList.mora]);

  useEffect(() => {
    if (!initialize) return;
    const fetchData = async () => {
      const _blob = state.blobs[downpitch_120]
        ? state.blobs[downpitch_120]
        : await getBlobFromAssets(downpitch_120);

      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', downpitch_120],
        _blob
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
      setInitialize(false);
    };
    fetchData();
  }, [initialize]);

  if (!state.audioContext) return <TouchMe />;

  const handleTapped = (id: string) => {
    const updatedTapped = [...state.rhythmList.tapped];
    updatedTapped.push(id);
    const updatedRhythmList: RhythmListState = {
      ...state.rhythmList,
      tapped: updatedTapped,
    };
    setRhythmList(updatedRhythmList);
  };

  return (
    <Container
      maxWidth={state.rhythmList.mora < 3 ? 'xs' : 'sm'}
      sx={{ paddingTop: 10 }}
    >
      <div
        style={{
          display: 'grid',
          rowGap: 16,
          gridTemplateColumns,
          columnGap: 16,
        }}
      >
        {cardIds.map((cardId, index) => {
          const card = PITCHES[cardId];
          return (
            <RhythmRow card={card} key={index} handleTapped={handleTapped} />
          );
        })}
      </div>
    </Container>
  );
};

export default RhythmListPane;