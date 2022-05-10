import { useTheme } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../services/context';
import { INITIAL_WORKOUT } from '../../../services/useWorkouts';

const WorkoutStatus = () => {
  const theme = useTheme();
  const { workouts, workoutRound, checkedIndexes, workoutId } =
    useContext(AppContext);

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;
  const workoutItems = workout.items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const { currentRound } = workoutRound;
    const currentIndex =
      workoutItems.length * (currentRound - 1) + checkedIndexes.length;
    setCurrentIndex(currentIndex);
  }, [checkedIndexes, workoutRound]);

  useEffect(() => {
    const { totalRounds } = workoutRound;
    const totalItems = workoutItems.length * totalRounds;
    setTotalItems(totalItems);
  }, [workoutItems, workoutRound]);

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
