import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';

import { Container } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';

import WorkoutStatus from '../commons/WorkoutStatus';
import AppContext from '../../../../services/context';
import ReadySign from './components/ReadySign';
import NextButton from './components/NextButton';
import CueList from './components/CueList';
import WorkoutLabel from '../commons/WorkoutLabel';
import { INITIAL_WORKOUT } from '../../../../Model';

const WorkoutCuePane = () => {
  const { state } = useContext(AppContext);

  const { workouts, workoutParams } = state;
  const { workoutId, isRunning, bpm, checkedIndexes } = workoutParams;

  const [currentIndex, setCurrentIndex] = useState(-1);

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { label, beatCount } = workout;

  useEffect(() => {
    if (!isRunning) {
      setCurrentIndex(-1);
    }
  }, [isRunning]);

  return (
    <Container maxWidth='sm' sx={{ marginTop: 3 }}>
      <WorkoutLabel label={label} beatCount={beatCount} />
      {!isRunning && !!checkedIndexes.length ? (
        <BpmPane bpm={bpm} fontSize={88} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WorkoutStatus />
        </div>
      )}

      <CueList currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      <ReadySign />
      <NextButton resetCurrentIndex={() => setCurrentIndex(-1)} />
    </Container>
  );
};

export default WorkoutCuePane;
