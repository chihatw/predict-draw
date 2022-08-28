import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { INITIAL_WORKOUT } from '../../../../../Model';
import { AppContext } from '../../../../../App';

const StopButton = ({ handleClickStop }: { handleClickStop: () => void }) => {
  const { state } = useContext(AppContext);
  const { workouts, workoutParams } = state;
  const { workoutId, currentRound, totalRounds, checkedIndexes } =
    workoutParams;
  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;
  const { items } = workout;

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
