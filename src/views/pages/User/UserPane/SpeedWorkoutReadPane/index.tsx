import { useContext, useEffect, useReducer } from 'react';

import { AppContext } from '../../../..';

import {
  buildSpeedWorkoutReadState,
  INITIAL_SPEED_WORKOUT_READ_STATE,
  SpeedWorkoutReadState,
} from './Model';
import SpeedWorkoutReadForm from './SpeedWorkoutReadForm';

const reducer = (state: SpeedWorkoutReadState, action: SpeedWorkoutReadState) =>
  action;

const SpeedWorkoutReadPane = () => {
  const { state } = useContext(AppContext);

  const [speedWorkoutReadState, speedWorkoutReadDispatch] = useReducer(
    reducer,
    INITIAL_SPEED_WORKOUT_READ_STATE
  );

  useEffect(() => {
    const speedWorkoutReadState = buildSpeedWorkoutReadState(state);
    speedWorkoutReadDispatch(speedWorkoutReadState);
  }, [
    state.params.speedWorkout.checkedIndexes,
    state.params.speedWorkout.updatedAt,
    state.params.speedWorkout.isRunning,
    state.params.speedWorkout.selectedId,
    state.params.speedWorkout.totalRounds,
  ]);

  return (
    <SpeedWorkoutReadForm
      state={speedWorkoutReadState}
      dispatch={speedWorkoutReadDispatch}
    />
  );
};

export default SpeedWorkoutReadPane;
