import getMoras from 'get-moras';
import downpitch_120 from '../../assets/audios/downpitch_120.mp3';
import {
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';

import React, { useContext, useEffect, useState } from 'react';

import Layout from '../../Layout';

import { AppContext } from '../../App';
import { setPageState } from '../../services/pageState';
import { resetWorkoutParams } from '../../services/workoutParams';
import CueWorkoutList from './CueWorkoutList';
import PageStatePane from './PageStatePane';
import RandomWorkoutList from './RandomWorkoutList';
import StatusPane from './StatusPane';
import WorkingMemoryPane from './WorkingMemoryPane';
import WorkoutList from './WorkoutList';
import WorkoutPane from './WorkoutPane';
import NotePane from './NotePane';
import RhythmListPane from './RhythmListPane';
import { KanaCards, RhythmListening } from '../../Model';
import {
  buildCueIds,
  setRhythmListening,
  setRhythmListeningAnswers,
} from '../../services/rhythmListening';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';
import { PITCHES } from '../../pitch';
import RhythmListeningPane from './RhythmListeningPane';
import { setKanaCards } from '../../services/kanaCard';
import Delete from '@mui/icons-material/Delete';

const MngPage = () => {
  const { state } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(downpitch_120);
      const blob = await response.blob();
    };
    fetchData();
  }, []);

  const handleChangeTotalRounds = (totalRounds: number) => {
    resetWorkoutParams(totalRounds);
  };

  const handleChangePageState = (user: string, state: string) => {
    setPageState({ id: user, state });
  };

  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <PageStatePane
            user='liSan'
            value={state.pageStates.liSan}
            handleChange={handleChangePageState}
          />
          <PageStatePane
            user='kouSan'
            value={state.pageStates.kouSan}
            handleChange={handleChangePageState}
          />
          <PageStatePane
            user='chinSan'
            value={state.pageStates.chinSan}
            handleChange={handleChangePageState}
          />
          <Divider />
          <div style={{ display: 'grid', rowGap: 16, paddingBottom: 80 }}>
            <KanaCardsPane />
            <NotePane />
            <RhythmListPane />
            <RhythmListeningPane />
            <StatusPane />
            <TextField
              size='small'
              type='number'
              label='totalRounds'
              value={state.workoutParams.totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
            />

            <WorkoutPane />
            <WorkoutList />
            <RandomWorkoutList />
            <CueWorkoutList />
            <WorkingMemoryPane />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;

const KanaCardsPane = () => {
  const { state } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const handleChangeInput = (input: string) => {
    setInput(input);
    let moras = getMoras(input);
    moras = moras.filter((item) => item !== '\n');
    const updatedKanaCards: KanaCards = {
      ...state.kanaCards,
      kanas: moras,
    };
    setKanaCards(updatedKanaCards);
  };

  const handleClearTapped = () => {
    const updatedKanaCards: KanaCards = {
      ...state.kanaCards,
      tapped: [],
    };
    setKanaCards(updatedKanaCards);
  };

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Kana Cards</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <h4 style={{ flexBasis: 80 }}>tapped</h4>
              <div>{state.kanaCards.tapped.join(', ')}</div>
            </div>
            <IconButton onClick={handleClearTapped}>
              <Delete />
            </IconButton>
          </div>
          <TextField
            label='kanas string'
            multiline
            rows={2}
            value={input}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
