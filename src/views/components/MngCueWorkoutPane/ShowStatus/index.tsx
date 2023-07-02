import { Button } from '@mui/material';
import { cueWorkoutParamsActions } from 'application/cueWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import createCueFromParams from '../../../../services/cueWorkout/createCueFromParams';
import { setCueWorkoutCue } from '../../../../services/cueWorkout/cueWorkout';

const ShowStatus = () => {
  const dispatch = useDispatch();
  const { isRunning, points, colors } = useSelector(
    (state: RootState) => state.cueWorkoutParams
  );
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams
  );

  const handleReset = async () => {
    dispatch(cueWorkoutParamsActions.reset());
    const cue = createCueFromParams(colors, cuePatternParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 80px)',
          alignItems: 'center',
        }}
      >
        <h4>Points</h4>
        <div>{points}</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 100px)',
          alignItems: 'center',
        }}
      >
        <h4>IsRunning</h4>
        <div>{String(isRunning)}</div>
      </div>
      <Button fullWidth variant='outlined' onClick={handleReset}>
        reset
      </Button>
    </>
  );
};

export default ShowStatus;
