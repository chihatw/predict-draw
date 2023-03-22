import Check from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import { SpeedWorkoutParams } from '../../../Model';
import { setSpeedWorkoutParams } from '../../../services/speedWorkout';

const SpeedWorkoutList = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    if (!!selectedId) return;
    setSelectedId(state.params.speedWorkout.selectedId);
  }, [selectedId, state.params.speedWorkout.selectedId]);

  const handleChangeSelectedId = (id: string) => {
    let updatedSelectedId = '';
    if (id !== selectedId) {
      updatedSelectedId = id;
    }

    // local
    setSelectedId(updatedSelectedId);

    const updatedParams: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      selectedId: updatedSelectedId,
    };
    // remote
    setSpeedWorkoutParams(updatedParams);
  };

  const handleOpenEditor = (workoutId: string) => {
    navigate(`/mng/speed/${workoutId}`);
  };

  return (
    <div>
      {Object.values(state.speedWorkouts).map((workout, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
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
      ))}
    </div>
  );
};

export default SpeedWorkoutList;
