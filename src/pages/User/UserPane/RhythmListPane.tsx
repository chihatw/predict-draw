import * as R from 'ramda';
import { Card, CardContent, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import { createSourceNode, getBlob } from '../../../services/utils';
import { RhythmListState, State } from '../../../Model';
import { ActionTypes } from '../../../Update';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';
import TouchMe from './RandomWorkoutPane/RecordingPane/TouchMe';
import { setRhythmList } from '../../../services/rhythmList';

export const AUDIO_PATH = '/audios/downpitch_120.mp3';
export type Card = { id: string; start: number; end: number; pitchStr: string };

export const CARDS: { [id: string]: Card } = {
  ta: { id: 'ta', start: 0.6, end: 1.3, pitchStr: 'タ＼ッ' },
  taa: { id: 'taa', start: 1.8, end: 2.7, pitchStr: 'タ＼ー' },
  tan: { id: 'tan', start: 3.1, end: 3.7, pitchStr: 'タ＼ン' },
  tata: { id: 'tata', start: 4.4, end: 5.2, pitchStr: 'タ＼タ' },
  tatta: { id: 'tatta', start: 5.4, end: 6.5, pitchStr: 'タ＼ッタ' },
  taata: { id: 'taata', start: 7.0, end: 7.9, pitchStr: 'タ＼ータ' },
  tanta: { id: 'tanta', start: 8.6, end: 9.4, pitchStr: 'タ＼ンタ' },
  tatata: {
    id: 'tatata',
    start: 10.0,
    end: 10.9,
    pitchStr: 'タ＼タタ',
  },
  tatax: { id: 'tatax', start: 4.4, end: 5.2, pitchStr: 'タ＼タッ' },
  tataa: {
    id: 'tataa',
    start: 11.5,
    end: 12.4,
    pitchStr: 'タ＼ター',
  },
  tatan: {
    id: 'tatan',
    start: 13.1,
    end: 13.9,
    pitchStr: 'タ＼タン',
  },
  tattata: {
    id: 'tattata',
    start: 14.5,
    end: 15.6,
    pitchStr: 'タ＼ッタタ',
  },
  taatata: {
    id: 'taatata',
    start: 16.3,
    end: 17.2,
    pitchStr: 'タ＼ータタ',
  },
  tantata: {
    id: 'tantata',
    start: 18.1,
    end: 19.1,
    pitchStr: 'タ＼ンタタ',
  },
  tatatata: { id: 'tatatata', start: 19.8, end: 21.1, pitchStr: 'タ＼タタタ' },
  tatatta: {
    id: 'tatatta',
    start: 21.6,
    end: 22.7,
    pitchStr: 'タ＼タッタ',
  },
  tataata: {
    id: 'tataata',
    start: 23.3,
    end: 24.5,
    pitchStr: 'タ＼タータ',
  },
  tatanta: {
    id: 'tatanta',
    start: 25.1,
    end: 26.2,
    pitchStr: 'タ＼タンタ',
  },
  tatatax: {
    id: 'tatatax',
    start: 10,
    end: 10.9,
    pitchStr: 'タ＼タタッ',
  },
  tatataa: {
    id: 'tatataa',
    start: 26.9,
    end: 28,
    pitchStr: 'タ＼タター',
  },
  tatatan: {
    id: 'tatatan',
    start: 28.7,
    end: 29.8,
    pitchStr: 'タ＼タタン',
  },
  tattaa: {
    id: 'tattaa',
    start: 30.5,
    end: 31.6,
    pitchStr: 'タ＼ッター',
  },
  tattan: {
    id: 'tattan',
    start: 32.3,
    end: 33.4,
    pitchStr: 'タ＼ッタン',
  },
  taataa: {
    id: 'taataa',
    start: 34.0,
    end: 35.1,
    pitchStr: 'タ＼ーター',
  },
  taatan: {
    id: 'taatan',
    start: 35.8,
    end: 36.9,
    pitchStr: 'タ＼ータン',
  },
  tantaa: {
    id: 'tantaa',
    start: 37.5,
    end: 38.7,
    pitchStr: 'タ＼ンター',
  },
  tantan: {
    id: 'tantan',
    start: 39.3,
    end: 40.3,
    pitchStr: 'タ＼ンタン',
  },
};

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
      const _blob = state.blobs[AUDIO_PATH]
        ? state.blobs[AUDIO_PATH]
        : await getBlob(AUDIO_PATH);
      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', AUDIO_PATH],
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
          const card = CARDS[cardId];
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
  card: Card;
  handleTapped: (id: string) => void;
}) => {
  const { state } = useContext(AppContext);
  const blob = state.blobs[AUDIO_PATH];

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
