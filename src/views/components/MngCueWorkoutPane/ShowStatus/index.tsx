import { cueWorkoutCueActions } from '@/application/cueWorkoutCue/framework/0-reducer';
import { cueWorkoutParamsActions } from '@/application/cueWorkoutParams/framework/0-reducer';
import { Button } from '@mui/material';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';

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
    dispatch(cueWorkoutCueActions.updateCueStart({ colors, cuePatternParams }));
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
