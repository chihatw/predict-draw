import { TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../../services/context';
import {
  useHandleWorkoutItems,
  WorkoutRound,
} from '../../../../services/useWorkoutItems';

const EditTotalRoundsPane = () => {
  const { workoutRound } = useContext(AppContext);
  const { setWorkoutRound } = useHandleWorkoutItems();
  const [totalRounds, setTotalRounds] = useState(0);

  useEffect(() => {
    setTotalRounds(workoutRound.totalRounds);
  }, [workoutRound]);

  const handleChangeTotalRounds = (value: number) => {
    setTotalRounds(value);
    const { currentRound } = workoutRound;
    setWorkoutRound({ totalRounds: value, currentRound });
  };

  return (
    <TextField
      size='small'
      type='number'
      label='totalRounds'
      value={totalRounds}
      onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
    />
  );
};

export default EditTotalRoundsPane;
