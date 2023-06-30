import { Container } from '@mui/material';
import React from 'react';
import { PitchWorkoutFormState } from '../Model';
import PitchWorkoutPractice from './PitchWorkoutPractice';
import PitchWorkoutResult from './PitchWorkoutResult';

const PitchWorkoutForm = ({
  state,
  dispatch,
}: {
  state: PitchWorkoutFormState;
  dispatch: React.Dispatch<PitchWorkoutFormState>;
}) => {
  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2 }}>
      <Switcher state={state} dispatch={dispatch} />
    </Container>
  );
};

export default PitchWorkoutForm;

const Switcher = ({
  state,
  dispatch,
}: {
  state: PitchWorkoutFormState;
  dispatch: React.Dispatch<PitchWorkoutFormState>;
}) => {
  //
  if (state.currentIndex === state.cueIds.length)
    return <PitchWorkoutResult state={state} />;

  //
  return <PitchWorkoutPractice state={state} dispatch={dispatch} />;
};
