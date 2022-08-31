import { Container } from '@mui/material';
import React from 'react';
import { RhythmLWorkoutFormState } from '../Model';
import RhythmWorkoutAnswer from './RhythmWorkoutAnswer';
import RhythmWorkoutResult from './RhythmWorkoutResult';

const RhythmWorkoutForm = ({
  state,
  dispatch,
}: {
  state: RhythmLWorkoutFormState;
  dispatch: React.Dispatch<RhythmLWorkoutFormState>;
}) => {
  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2 }}>
      {(() => {
        if (state.currentIndex !== state.cueIds.length) {
          return <RhythmWorkoutAnswer state={state} dispatch={dispatch} />;
        }
        return <RhythmWorkoutResult state={state} />;
      })()}
    </Container>
  );
};

export default RhythmWorkoutForm;
