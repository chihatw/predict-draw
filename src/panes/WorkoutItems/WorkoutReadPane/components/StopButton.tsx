import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../../../../services/context';
import { INITIAL_WORKOUT } from '../../../../services/useWorkouts';

const StopButton = ({ handleClickStop }: { handleClickStop: () => void }) => {
  const { workoutRound, checkedIndexes, workouts, workoutId } =
    useContext(AppContext);
  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;
  const { items } = workout;
  const { currentRound, totalRounds } = workoutRound;
  if (currentRound === totalRounds && items.length === checkedIndexes.length) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={handleClickStop}>
          <StopCircleRoundedIcon sx={{ fontSize: 120, color: '#52a2aa' }} />
        </IconButton>
      </div>
    );
  }
  return <></>;
};

export default StopButton;
