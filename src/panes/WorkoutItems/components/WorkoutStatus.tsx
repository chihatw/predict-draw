import { useTheme } from '@mui/system';
import React from 'react';
import { useWorkoutItems } from '../../../services/useWorkoutItems';

const WorkoutStatus = () => {
  const { workoutRound, checkedIndexes, workoutItems } = useWorkoutItems();
  const { totalRounds, currentRound } = workoutRound;
  const theme = useTheme();

  const currentIndex =
    workoutItems.length * (currentRound - 1) + checkedIndexes.length;

  const totalItems = workoutItems.length * totalRounds;

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
