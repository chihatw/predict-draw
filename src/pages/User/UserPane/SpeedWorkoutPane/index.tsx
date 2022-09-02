import React, { useContext, useEffect, useReducer } from 'react';

import { AppContext } from '../../../../App';
import { INITIAL_SPEED_READING_STATE } from './Model';
import {
  buildSpeedWorkoutState,
  setSpeedWorkoutParams,
} from '../../../../services/speedWorkout';
import { SpeedWorkoutActionTypes, speedReadingReducer } from './Update';
import SpeedWorkoutForm from './SpeedWorkoutForm';
import { SpeedWorkoutParams } from '../../../../Model';

export const SpeedWorkoutPane = () => {
  const { state } = useContext(AppContext);

  const [speedReadingState, speedReadingDispatch] = useReducer(
    speedReadingReducer,
    INITIAL_SPEED_READING_STATE
  );

  useEffect(() => {
    const speedReadingState = buildSpeedWorkoutState(state);
    speedReadingDispatch({
      type: SpeedWorkoutActionTypes.setState,
      payload: speedReadingState,
    });
    const params: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      bpm: 0,
      isRunning: false,
    };
    setSpeedWorkoutParams(params);
  }, [
    state.speedWorkouts,
    state.params.speedWorkout.updatedAt,
    state.params.speedWorkout.selectedId,
  ]);

  return (
    <SpeedWorkoutForm
      state={speedReadingState}
      dispatch={speedReadingDispatch}
    />
  );
};
