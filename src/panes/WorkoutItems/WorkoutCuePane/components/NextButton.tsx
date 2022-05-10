import SyncIcon from '@mui/icons-material/Sync';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../../../../services/context';
import { useHandleWorkoutItems } from '../../../../services/useWorkoutItems';
import { INITIAL_WORKOUT } from '../../../../services/useWorkouts';

const NextButton = ({
  resetCurrentIndex,
}: {
  resetCurrentIndex: () => void;
}) => {
  const { workouts, workoutId, workoutTime, workoutRound, checkedIndexes } =
    useContext(AppContext);
  const { setCheckedIndexes, setWorkoutRound } = useHandleWorkoutItems();

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { items } = workout;
  const { isRunning } = workoutTime;
  const { totalRounds, currentRound } = workoutRound;

  const handleClickNextRound = () => {
    setWorkoutRound({ totalRounds, currentRound: currentRound + 1 });
    setCheckedIndexes([]);
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
