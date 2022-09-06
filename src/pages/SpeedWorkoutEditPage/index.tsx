import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../../App';
import { SpeedWorkout, State } from '../../Model';
import {
  buildSpeedWorkoutEditState,
  setSpeedWorkout,
} from '../../services/speedWorkout';
import { ActionTypes } from '../../Update';
import {
  INITIAL_SPEED_WORKOUT_EDIT_STATE,
  SpeedWorkoutEditState,
} from './Model';
import SpeedWorkoutForm from './SpeedWorkoutForm';

const reducer = (state: SpeedWorkoutEditState, action: SpeedWorkoutEditState) =>
  action;

const SpeedWorkoutEditPage = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [speedWorkoutEditState, speedWorkoutEditDispatch] = useReducer(
    reducer,
    INITIAL_SPEED_WORKOUT_EDIT_STATE
  );

  useEffect(() => {
    if (!workoutId) return;
    const speedWorkoutEditState = buildSpeedWorkoutEditState(state, workoutId);
    speedWorkoutEditDispatch(speedWorkoutEditState);
  }, [workoutId]);

  const handleSubmit = () => {
    if (!workoutId) {
      // todo create new SpeedWorkout
      return;
    }
    const workout = state.speedWorkouts[workoutId];
    if (!workout) return;

    const updatedSpeedWorkout: SpeedWorkout = {
      ...workout,
      cues: speedWorkoutEditState.cues,
      items: speedWorkoutEditState.workoutItems,
      label: speedWorkoutEditState.label,
      cueType: speedWorkoutEditState.cueType,
      beatCount: speedWorkoutEditState.beatCount,
    };
    const updatedSpeedWorkouts = {
      ...state.speedWorkouts,
      [workoutId]: updatedSpeedWorkout,
    };

    const updatedState: State = {
      ...state,
      speedWorkouts: updatedSpeedWorkouts,
    };
    dispatch({ type: ActionTypes.setState, payload: updatedState });

    setSpeedWorkout(updatedSpeedWorkout);

    navigate('/mng');
  };

  return (
    <SpeedWorkoutForm
      state={speedWorkoutEditState}
      dispatch={speedWorkoutEditDispatch}
      handleSubmit={handleSubmit}
    />
  );
};

export default SpeedWorkoutEditPage;
