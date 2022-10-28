import * as R from 'ramda';
import { TextField } from '@mui/material';
import React, { useContext } from 'react';
import { CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import { setCueWorkoutParams } from '../../../services/cueWorkout/cueWorkout';

const SetTime = () => {
  const { state } = useContext(AppContext);
  const handleChangeTime = async (time: number) => {
    const updatedParams = R.assocPath<number, CueWorkoutParams>(
      ['time'],
      time
    )(state.cueWorkout.params);

    await setCueWorkoutParams(updatedParams);
  };
  return (
    <>
      <h4>Time</h4>
      <TextField
        fullWidth
        size='small'
        type='number'
        value={state.cueWorkout.params.time}
        onChange={(e) => handleChangeTime(Number(e.target.value))}
      />
    </>
  );
};

export default SetTime;
