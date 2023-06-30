import { TextField } from '@mui/material';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../..';
import { CueWorkoutParams } from '../../../../Model';
import { setCueWorkoutParams } from '../../../../services/cueWorkout/cueWorkout';

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
