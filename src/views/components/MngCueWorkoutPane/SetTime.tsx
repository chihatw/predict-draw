import { TextField } from '@mui/material';
import { cueWorkoutParamsActions } from 'application/cueWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';

const SetTime = () => {
  const dispatch = useDispatch();
  const { time } = useSelector((state: RootState) => state.cueWorkoutParams);
  const handleChangeTime = async (time: number) => {
    dispatch(cueWorkoutParamsActions.setTime(time));
  };
  return (
    <>
      <h4>Time</h4>
      <TextField
        fullWidth
        size='small'
        type='number'
        value={time}
        onChange={(e) => handleChangeTime(Number(e.target.value))}
      />
    </>
  );
};

export default SetTime;
