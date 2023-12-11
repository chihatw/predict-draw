import { speedWorkoutParamsActions } from '@/application/speedWorkoutParams/framework/0-reducer';
import Check from '@mui/icons-material/Check';
import { Button, IconButton } from '@mui/material';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SpeedWorkoutRow({ speedWorkoutId }: { speedWorkoutId: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const label = useSelector(
    (state: RootState) => state.speedWorkouts.entities[speedWorkoutId]?.label
  );
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
        onClick={() => handleChangeSelectedId(speedWorkoutId)}
        sx={{ color: selectedId === speedWorkoutId ? '#52a2aa' : '#ccc' }}
      >
        <Check />
      </IconButton>

      <Button
        sx={{ flexGrow: 1, justifyContent: 'flex-start', color: 'black' }}
        onClick={() => handleOpenEditor(speedWorkoutId)}
      >
        {label}
      </Button>
    </div>
  );
}

export default SpeedWorkoutRow;
