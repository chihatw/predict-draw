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

const AUDIO_PATH = '/audios/downpitch_120.mp3';

type Card = { id: string; start: number; end: number; pitchStr: string };
const TA: Card = { id: 'ta', start: 0.6, end: 1.3, pitchStr: 'タ＼ッ' };
const TAA: Card = { id: 'taa', start: 1.8, end: 2.7, pitchStr: 'タ＼ー' };
const TAN: Card = { id: 'tan', start: 3.1, end: 3.7, pitchStr: 'タ＼ン' };
const TATA: Card = { id: 'tata', start: 4.4, end: 5.2, pitchStr: 'タ＼タ' };
const TATTA: Card = { id: 'tatta', start: 5.4, end: 6.5, pitchStr: 'タ＼ッタ' };
const TAATA: Card = { id: 'taata', start: 7.0, end: 7.9, pitchStr: 'タ＼ータ' };
const TANTA: Card = { id: 'tanta', start: 8.6, end: 9.4, pitchStr: 'タ＼ンタ' };
const TATATA: Card = {
  id: 'tatata',
  start: 10.0,
  end: 10.9,
  pitchStr: 'タ＼タタ',
};
const TATAX: Card = { id: 'tatax', start: 4.4, end: 5.2, pitchStr: 'タ＼タッ' };
const TATAA: Card = {
  id: 'tataa',
  start: 11.5,
  end: 12.4,
  pitchStr: 'タ＼ター',
};
const TATAN: Card = {
  id: 'tatan',
  start: 13.1,
  end: 13.9,
  pitchStr: 'タ＼タン',
};
const TATTATA: Card = {
  id: 'tattata',
  start: 14.5,
  end: 15.6,
  pitchStr: 'タ＼ッタタ',
};
const TAATATA: Card = {
  id: 'taatata',
  start: 16.3,
  end: 17.2,
  pitchStr: 'タ＼ータタ',
};
const TANTATA: Card = {
  id: 'tantata',
  start: 18.1,
  end: 19.1,
  pitchStr: 'タ＼ンタタ',
};
const TATATATA: Card = {
  id: 'tatatata',
  start: 19.8,
  end: 21.1,
  pitchStr: 'タ＼タタタ',
};
const TATATTA: Card = {
  id: 'tatatta',
  start: 21.6,
  end: 22.7,
  pitchStr: 'タ＼タッタ',
};
const TATAATA: Card = {
  id: 'tataata',
  start: 23.3,
  end: 24.5,
  pitchStr: 'タ＼タータ',
};
const TATANTA: Card = {
  id: 'tatanta',
  start: 25.1,
  end: 26.2,
  pitchStr: 'タ＼タンタ',
};
const TATATAX: Card = {
  id: 'tatatax',
  start: 10,
  end: 10.9,
  pitchStr: 'タ＼タタッ',
};
const TATATAA: Card = {
  id: 'tatataa',
  start: 26.9,
  end: 28,
  pitchStr: 'タ＼タター',
};
const TATATAN: Card = {
  id: 'tatatan',
  start: 28.7,
  end: 29.8,
  pitchStr: 'タ＼タタン',
};
const TATTAA: Card = {
  id: 'tattaa',
  start: 30.5,
  end: 31.6,
  pitchStr: 'タ＼ッター',
};
const TATTAN: Card = {
  id: 'tattan',
  start: 32.3,
  end: 33.4,
  pitchStr: 'タ＼ッタン',
};
const TAATAA: Card = {
  id: 'taataa',
  start: 34.0,
  end: 35.1,
  pitchStr: 'タ＼ーター',
};
const TAATAN: Card = {
  id: 'taatan',
  start: 35.8,
  end: 36.9,
  pitchStr: 'タ＼ータン',
};
const TANTAA: Card = {
  id: 'tantaa',
  start: 37.5,
  end: 38.7,
  pitchStr: 'タ＼ンター',
};
const TANTAN: Card = {
  id: 'tantan',
  start: 39.3,
  end: 40.3,
  pitchStr: 'タ＼ンタン',
};

const RhythmListPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initialize, setInitialize] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [gridTemplateColumns, setGridTemplateColumns] = useState('1fr');

  useEffect(() => {
    switch (state.rhythmList.mora) {
      case 2:
        setCards([TATTA, TATAX, TAATA, TATAA, TANTA, TATAN, TATATA]);
        setGridTemplateColumns('1fr 1fr');
        break;
      case 3:
        setCards([
          TATTATA,
          TATATTA,
          TATATAX,
          TATTAA,
          TATTAN,
          TAATATA,
          TATAATA,
          TATATAA,
          TAATAA,
          TAATAN,
          TANTATA,
          TATANTA,
          TATATAN,
          TANTAA,
          TANTAN,
          TATATATA,
        ]);
        setGridTemplateColumns('1fr 1fr 1fr 1fr 1fr');
        break;
      default:
        setCards([TA, TAA, TAN, TATA]);
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
        {cards.map((card, index) => (
          <RhythmRow card={card} key={index} handleTapped={handleTapped} />
        ))}
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
