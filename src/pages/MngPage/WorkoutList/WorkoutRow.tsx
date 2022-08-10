import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse, IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppContext from '../../../services/context';
import { setWorkoutId } from '../../../services/workoutParams';
import { deleteWorkout } from '../../../services/workout';
import WorkoutForm from '../WorkoutForm';
import { WorkoutParams } from '../../../Model';

const WorkoutRow = ({ index }: { index: number }) => {
  const { state } = useContext(AppContext);
  const { workoutParams, workouts } = state;
  const workout = workouts[index];
  const { label, id: workoutId, cues } = workout;
  const { workoutId: selectedWotkoutId, totalRounds } = workoutParams;

  const [open, setOpen] = useState(false);

  const handleCheck = () => {
    setWorkoutId(workoutId);
  };
  const handleDelete = () => {
    deleteWorkout(workoutId);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <IconButton
            onClick={handleCheck}
            sx={{ color: selectedWotkoutId === workoutId ? '#52a2aa' : 'grey' }}
          >
            <CheckIcon />
          </IconButton>
        </div>
        <div style={{ flexGrow: 1 }}>{label}</div>
        <div>
          <IconButton onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={open}>
        <WorkoutForm workout={workout} callback={() => setOpen(false)} />
      </Collapse>
    </div>
  );
};

export default WorkoutRow;
