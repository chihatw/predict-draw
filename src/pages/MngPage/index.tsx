import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { PlayCircle } from '@mui/icons-material';
import { Container, Divider, IconButton, TextField } from '@mui/material';
import { curryN } from 'ramda';
import React, { useContext, useEffect, useRef } from 'react';
import string2PitchesArray from 'string2pitches-array';
import Layout from '../../Layout';
import { INITIAL_WORKOUT } from '../../Model';
import AppContext from '../../services/context';
import { setPageState } from '../../services/pageState';
import { resetWorkoutParams } from '../../services/workoutParams';
import CueWorkoutList from './CueWorkoutList';
import PageStatePane from './PageStatePane';
import RandomWorkoutList from './RandomWorkoutList';
import StatusPane from './StatusPane';
import WorkingMemoryPane from './WorkingMemoryPane';
import WorkoutItemList from './WorkoutItemList';
import WorkoutList from './WorkoutList';

const MngPage = () => {
  const { state, dispatch } = useContext(AppContext);

  const workout =
    state.workouts.find(
      (workout) => workout.id === state.workoutParams.workoutId
    ) || INITIAL_WORKOUT;

  const { label, items, cueType, cues, beatCount } = workout;

  const handleChangeTotalRounds = (totalRounds: number) => {
    if (!dispatch) return;
    resetWorkoutParams(totalRounds);
  };

  const handleChangeLiSanPageState = (state: string) => {
    if (!dispatch) return;
    setPageState({ id: 'liSan', state });
  };

  const handleChangeKouSanPageState = (state: string) => {
    if (!dispatch) return;
    setPageState({ id: 'kouSan', state });
  };
  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <PageStatePane
            label='李さん'
            value={state.liSanPageState}
            handleChange={handleChangeLiSanPageState}
          />
          <PageStatePane
            label='黄さん'
            value={state.kouSanPageState}
            handleChange={handleChangeKouSanPageState}
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
            {!!state.workoutParams.workoutId && (
              <>
                <h3>{label}</h3>
                <div>{`beatCount: ${beatCount}`}</div>
                <WorkoutItemList
                  workoutItems={items}
                  cueType={cueType}
                  cues={cues}
                />
              </>
            )}

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
