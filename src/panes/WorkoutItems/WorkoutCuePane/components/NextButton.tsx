import SyncIcon from '@mui/icons-material/Sync';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { INITIAL_WORKOUT } from '../../../../Model';
import AppContext from '../../../../services/context';
import { setCurrentRound } from '../../../../services/workoutParams';

const NextButton = ({
  resetCurrentIndex,
}: {
  resetCurrentIndex: () => void;
}) => {
  const { state } = useContext(AppContext);
  const { workouts, workoutParams } = state;
  const { workoutId, isRunning, totalRounds, currentRound, checkedIndexes } =
    workoutParams;

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { items } = workout;

  const handleClickNextRound = () => {
    setCurrentRound(currentRound + 1, totalRounds);
    resetCurrentIndex();
  };

  if (
    isRunning &&
    currentRound !== totalRounds &&
    checkedIndexes.length === items.length
  ) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton
          sx={{
            background: '#52a2aa',
            ':hover': { background: '#52a2aa' },
          }}
          onClick={handleClickNextRound}
        >
          <SyncIcon sx={{ fontSize: 82, color: '#fff' }} />
        </IconButton>
      </div>
    );
  }

  return <></>;
};

export default NextButton;
