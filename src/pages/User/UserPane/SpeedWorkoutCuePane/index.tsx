import { Container } from '@mui/material';
import React, { useEffect, useState, useContext, useReducer } from 'react';

import WorkoutStatus from '../commons/WorkoutStatus';
import { AppContext } from '../../../../App';
import ReadySign from './ReadySign';
import CueList from './CueList';
import WorkoutLabel from '../commons/WorkoutLabel';
import {
  buildSpeedWorkoutCueState,
  INITIAL_SPEED_WORKOUT_CUE_STATE,
  SpeedWorkoutCueState,
} from './Model';

const reducer = (state: SpeedWorkoutCueState, action: SpeedWorkoutCueState) =>
  action;

const SpeedWorkoutCuePane = () => {
  const { state } = useContext(AppContext);

  const [formState, formDispatch] = useReducer(
    reducer,
    INITIAL_SPEED_WORKOUT_CUE_STATE
  );

  useEffect(() => {
    const formState = buildSpeedWorkoutCueState(state);
    formDispatch(formState);
  }, [state.speedWorkouts, state.params.speedWorkout]);

  return <SpeedWOrkoutCueForm state={formState} dispatch={formDispatch} />;
};

export default SpeedWorkoutCuePane;

const SpeedWOrkoutCueForm = ({
  state,
  dispatch,
}: {
  state: SpeedWorkoutCueState;
  dispatch: React.Dispatch<SpeedWorkoutCueState>;
}) => {
  return (
    <Container maxWidth='sm' sx={{ marginTop: 3, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 32 }}>
        <WorkoutLabel
          label={state.workout.label}
          beatCount={state.workout.beatCount}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WorkoutStatus
            workout={state.workout}
            checkedIndexes={state.checkedIndexes}
            totalRounds={state.totalRounds}
            currentRound={state.currentRound}
          />
        </div>
        <CueList state={state} dispatch={dispatch} />
        {!state.isRunning && !state.checkedIndexes.length && <ReadySign />}
      </div>
    </Container>
  );
};