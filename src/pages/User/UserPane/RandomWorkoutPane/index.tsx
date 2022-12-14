import React, { useContext } from 'react';

import { AppContext } from '../../../../App';
import { INITIAL_RANDOM_WORKOUT } from '../../../../Model';

import ResultPane from './ResultPane';
import RecordingPane from './RecordingPane';

const RandomWorkoutPane = () => {
  const { state } = useContext(AppContext);
  const { randomWorkout } = state;
  const { workoutId, workouts, audioBuffers } = randomWorkout;
  const workout = workouts[workoutId] || INITIAL_RANDOM_WORKOUT;
  const audioBuffer = audioBuffers[workoutId] || null;

  if (!workout.id) return <></>;

  if (!!audioBuffer) return <ResultPane />;

  return <RecordingPane />;
};

export default RandomWorkoutPane;
