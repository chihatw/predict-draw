import { Container } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RandomWorkout } from '../../../Model';
import AppContext from '../../../services/context';
import {
  buildRandomWorkoutEditInitialState,
  setRandomWorkout,
} from '../../../services/randomWorkout';
import { ActionTypes } from '../../../Update';
import { INITIAL_RANDOM_WORKOUT_EDIT_STATE } from './Model';
import RandomWorkoutForm from './RandomWorkoutForm';
import { RandomWorkoutActionTypes, randomWorkoutEditReducer } from './Update';

const RandomWorkoutEditPage = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [randomWorkoutEditState, randomWorkoutEditDispatch] = useReducer(
    randomWorkoutEditReducer,
    INITIAL_RANDOM_WORKOUT_EDIT_STATE
  );

  useEffect(() => {
    if (!workoutId) return;
    const initialState = buildRandomWorkoutEditInitialState(state, workoutId);
    randomWorkoutEditDispatch({
      type: RandomWorkoutActionTypes.initialize,
      payload: initialState,
    });
  }, [workoutId, state]);

  const handleSubmit = async () => {
    if (!dispatch) return;
    const workout: RandomWorkout = {
      ...randomWorkoutEditState,
      id: workoutId || nanoid(8),
      time: 0,
      storagePath: '',
    };
    if (workoutId) {
      const { randomWorkout } = state;
      const { workouts } = randomWorkout;
      const gotWorkout = workouts[workoutId];
      if (gotWorkout) {
        const { time: gotTime, storagePath: gotStoragePath } = gotWorkout;
        workout.time = gotTime;
        workout.storagePath = gotStoragePath;
      }
    }
    await setRandomWorkout(workout);
    navigate('/mng/random');
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2 }}>
      <RandomWorkoutForm
        state={randomWorkoutEditState}
        dispatch={randomWorkoutEditDispatch}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default RandomWorkoutEditPage;
