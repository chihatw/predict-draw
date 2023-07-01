import Check from '@mui/icons-material/Check';
import { Button, IconButton } from '@mui/material';
import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SpeedWorkout } from '../../../../Model';

function SpeedWorkoutRow({ workout }: { workout: SpeedWorkout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedId = useSelector(
    (state: RootState) => state.speedWorkoutParams.selectedId
  );
  const handleChangeSelectedId = (id: string) => {
    dispatch(speedWorkoutParamsActions.selectId(id !== selectedId ? id : ''));
  };

  const handleOpenEditor = (workoutId: string) => {
    navigate(`/mng/speed/${workoutId}`);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        onClick={() => handleChangeSelectedId(workout.id)}
        sx={{ color: selectedId === workout.id ? '#52a2aa' : '#ccc' }}
      >
        <Check />
      </IconButton>

      <Button
        sx={{ flexGrow: 1, justifyContent: 'flex-start', color: 'black' }}
        onClick={() => handleOpenEditor(workout.id)}
      >
        {workout.label}
      </Button>
    </div>
  );
}

export default SpeedWorkoutRow;
