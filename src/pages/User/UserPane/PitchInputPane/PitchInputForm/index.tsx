import { Container } from '@mui/material';
import React from 'react';
import { PitchInputFormState } from '../Model';
import PitchInputPractice from './PitchInputPractice';
import PitchInputResult from './PitchInputResult';

const PitchInputForm = ({
  state,
  dispatch,
}: {
  state: PitchInputFormState;
  dispatch: React.Dispatch<PitchInputFormState>;
}) => {
  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2 }}>
      <Switcher state={state} dispatch={dispatch} />
    </Container>
  );
};

export default PitchInputForm;

const Switcher = ({
  state,
  dispatch,
}: {
  state: PitchInputFormState;
  dispatch: React.Dispatch<PitchInputFormState>;
}) => {
  if (state.currentIndex === state.cueIds.length)
    return <PitchInputResult state={state} />;

  return <PitchInputPractice state={state} dispatch={dispatch} />;
};
