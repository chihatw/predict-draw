import { Container } from '@mui/material';
import React from 'react';
import { PitchWorkoutFormState } from '../Model';
import PitchWorkoutAnswer from './PitchWorkoutAnswer';
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
      {(() => {
        if (state.currentIndex !== state.cueIds.length) {
          return <PitchWorkoutAnswer state={state} dispatch={dispatch} />;
        }
        return <PitchWorkoutResult state={state} />;
      })()}
    </Container>
  );
};

export default PitchWorkoutForm;
