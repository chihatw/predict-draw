import { speedWorkoutParamsActions } from '@/application/speedWorkoutParams/framework/0-reducer';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

function ResetButton() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(speedWorkoutParamsActions.reset());
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant='outlined' sx={{ width: 260 }} onClick={handleReset}>
        RESET
      </Button>
    </div>
  );
}

export default ResetButton;
