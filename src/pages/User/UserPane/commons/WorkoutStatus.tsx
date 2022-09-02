import { useTheme } from '@mui/system';
import React from 'react';
import { SpeedWorkout } from '../../../../Model';

const WorkoutStatus = ({
  workout,
  checkedIndexes,
  totalRounds,
  currentRound,
}: {
  workout: SpeedWorkout;
  checkedIndexes: number[];
  totalRounds: number;
  currentRound: number;
}) => {
  const theme = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <span
          style={{
            ...(theme.typography as any).lato900,
            fontSize: 90,
          }}
        >
          {checkedIndexes.length + workout.items.length * (currentRound - 1)}
        </span>
        <span
          style={{
            ...(theme.typography as any).lato900,
            fontSize: 48,
          }}
        >{`/${workout.items.length * totalRounds}`}</span>
      </div>
    </div>
  );
};

export default WorkoutStatus;
