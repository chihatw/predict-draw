import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';

import { Container } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';

import WorkoutStatus from '../components/WorkoutStatus';
import AppContext from '../../../services/context';
import { INITIAL_WORKOUT } from '../../../services/useWorkouts';
import ReadySign from './components/ReadySign';
import NextButton from './components/NextButton';
import CueList from './components/CueList';

const WorkoutCuePane = () => {
  const { workouts, workoutId, workoutTime, checkedIndexes } =
    useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { label, beatCount } = workout;
  const { isRunning, bpm } = workoutTime;

  useEffect(() => {
    if (!isRunning) {
      setCurrentIndex(-1);
    }
  }, [isRunning]);

  return (
    <Container maxWidth='sm' sx={{ marginTop: 3 }}>
      <div
        style={{
          color: '#aaa',
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        {`${label}（${beatCount}拍）`}
      </div>
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
