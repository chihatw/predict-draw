import downpitch_120 from '../../../assets/audios/downpitch_120.mp3';
import * as R from 'ramda';
import { Card, CardContent, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import { createSourceNode, getBlobFromAssets } from '../../../services/utils';
import { PitchCard, RhythmListState, State } from '../../../Model';
import { ActionTypes } from '../../../Update';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';
import TouchMe from './RandomWorkoutPane/RecordingPane/TouchMe';
import { setRhythmList } from '../../../services/rhythmList';
import { PITCHES } from '../../../pitch';

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
          'tatax',
          'taata',
          'tataa',
          'tanta',
          'tatan',
          'tatata',
        ]);
        setGridTemplateColumns('1fr 1fr');
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
      maxWidth={state.rhythmList.mora === 1 ? 'xs' : 'sm'}
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

const RhythmRow = ({
  card,
  handleTapped,
}: {
  card: PitchCard;
  handleTapped: (id: string) => void;
}) => {
  const { state } = useContext(AppContext);
  const blob = state.blobs[downpitch_120];

  const handleClick = () => {
    handleTapped(card.id);
    play();
  };
  const play = async () => {
    if (!state.audioContext || !blob) return;
    const sourceNode = await createSourceNode(blob, state.audioContext);
    sourceNode.start(0, card.start, card.end - card.start);
  };
  return (
    <Card
      sx={{ cursor: 'pointer', height: 80, background: '#eee' }}
      elevation={1}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          paddingTop: 3,
          justifyContent: 'center',
        }}
      >
        <SentencePitchLine pitchesArray={string2PitchesArray(card.pitchStr)} />
      </CardContent>
    </Card>
  );
};
