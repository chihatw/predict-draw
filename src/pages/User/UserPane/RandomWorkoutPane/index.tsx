import Delete from '@mui/icons-material/Delete';
import { Container, IconButton, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';

import { AppContext } from '../../../../App';
import { INITIAL_RANDOM_WORKOUT } from '../../../../Model';

import ResultPane from './ResultPane';
import RecordingPane from './RecordingPane';

const RandomWorkoutPane = () => {
  const { state } = useContext(AppContext);
  const { randomWorkout } = state;
  const { workoutId, workouts, blobs } = randomWorkout;
  const workout = workouts[workoutId] || INITIAL_RANDOM_WORKOUT;
  const workoutBlob = blobs[workoutId] || null;

  if (!workout.id) return <></>;

  if (!!workoutBlob) return <ResultPane />;

  return <RecordingPane />;
};

export default RandomWorkoutPane;
