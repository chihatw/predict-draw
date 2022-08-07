import { useTheme } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { INITIAL_WORKOUT } from '../../../Model';
import AppContext from '../../../services/context';

const WorkoutStatus = () => {
  const theme = useTheme();
  const { state } = useContext(AppContext);
  const { workouts, workoutParams } = state;
  const { workoutId, checkedIndexes, currentRound, totalRounds } =
    workoutParams;

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;
  const workoutItems = workout.items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const currentIndex =
      workoutItems.length * (currentRound - 1) + checkedIndexes.length;
    setCurrentIndex(currentIndex);
  }, [checkedIndexes, currentRound]);

  useEffect(() => {
    const totalItems = workoutItems.length * totalRounds;
    setTotalItems(totalItems);
  }, [workoutItems, totalRounds]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <span
          style={{
            ...(theme.typography as any).lato900,
            fontSize: 90,
          }}
        >
          {currentIndex}
        </span>
        <span
          style={{
            ...(theme.typography as any).lato900,
            fontSize: 48,
          }}
        >{`/${totalItems}`}</span>
      </div>
    </div>
  );
};

export default WorkoutStatus;
