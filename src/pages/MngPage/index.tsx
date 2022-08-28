import { Button, Container, Divider, TextField } from '@mui/material';

import React, { useContext } from 'react';

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
import { RhythmListening } from '../../Model';
import {
  buildCueIds,
  setRhythmListening,
  setRhythmListeningAnswers,
} from '../../services/rhythmListening';
import { CARDS } from '../User/UserPane/RhythmListPane';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';

const MngPage = () => {
  const { state } = useContext(AppContext);

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
            <StatusPane />
            <TextField
              size='small'
              type='number'
              label='totalRounds'
              value={state.workoutParams.totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
            />
            <RhythmListeningPane />
            <RhythmListPane />
            <NotePane />
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

const RhythmListeningPane = () => {
  const { state } = useContext(AppContext);

  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(mora, 1), 3);
    if (mora === state.rhythmListening.mora) return;

    let cueCount = 0;
    switch (mora) {
      case 2:
        cueCount = 7;
        break;
      case 3:
        cueCount = 16;
        break;
      default:
        cueCount = 4;
    }
    const cueIds = buildCueIds(mora, cueCount);
    const updatedRhythmListening: RhythmListening = {
      cueCount,
      cueIds,
      mora,
    };
    setRhythmListening(updatedRhythmListening);
    setRhythmListeningAnswers({});
  };
  const handleChangeCueCount = (cueCount: number) => {
    switch (state.rhythmListening.mora) {
      case 2:
        cueCount = Math.min(7, cueCount);
        break;
      case 3:
        cueCount = Math.min(16, cueCount);
        break;
      default:
        cueCount = Math.min(4, cueCount);
    }
    const cueIds = buildCueIds(state.rhythmListening.mora, cueCount);
    const updatedRhythmListening: RhythmListening = {
      ...state.rhythmListening,
      cueCount,
      cueIds,
    };
    setRhythmListening(updatedRhythmListening);
    setRhythmListeningAnswers({});
  };

  const handleShuffle = () => {
    const cueIds = buildCueIds(
      state.rhythmListening.mora,
      state.rhythmListening.cueCount
    );
    const updatedRhythmListening: RhythmListening = {
      ...state.rhythmListening,
      cueIds,
    };
    setRhythmListening(updatedRhythmListening);
    setRhythmListeningAnswers({});
  };

  return (
    <div>
      <h3>Rhythm Listening</h3>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <TextField
          label='mora'
          size='small'
          type='number'
          autoComplete='off'
          value={state.rhythmListening.mora}
          onChange={(e) => handleChangeMora(Number(e.target.value))}
        />
        <TextField
          label='cueCount'
          size='small'
          type='number'
          autoComplete='off'
          value={state.rhythmListening.cueCount}
          onChange={(e) => handleChangeCueCount(Number(e.target.value))}
        />
        <Button variant='outlined' onClick={handleShuffle}>
          Shuffle
        </Button>
        {state.rhythmListening.cueIds.map((cueId, index) => {
          const cueCard = CARDS[cueId];
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexBasis: 40, textAlign: 'center' }}>
                {index + 1}
              </div>
              <SentencePitchLine
                pitchesArray={string2PitchesArray(cueCard.pitchStr)}
              />
              <div>
                {(state.rhythmListeningAnswers[index] || []).map(
                  (item, itemIndex) => {
                    const isLast =
                      state.rhythmListeningAnswers[index].length - 1 ===
                      itemIndex;
                    return (
                      <span
                        key={itemIndex}
                        style={{
                          paddingLeft: 10,
                          color: isLast ? 'red' : '#ccc',
                        }}
                      >
                        {item}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
