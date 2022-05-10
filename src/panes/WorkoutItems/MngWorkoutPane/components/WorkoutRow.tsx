import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse, IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppContext from '../../../../services/context';
import {
  useHandleWorkoutItems,
  WorkoutRound,
} from '../../../../services/useWorkoutItems';
import { useHandleWorkouts, Workout } from '../../../../services/useWorkouts';
import FormPane from './FormPane';

const WorkoutRow = ({ workout }: { workout: Workout }) => {
  const { label, id } = workout;
  const { workoutId } = useContext(AppContext);

  const { deleteWorkout } = useHandleWorkouts();
  const { setWorkoutId, setWorkoutRound } = useHandleWorkoutItems();

  const [open, setOpen] = useState(false);

  const handleCheck = () => {
    setWorkoutId(id);
  };
  const handleDelete = () => {
    deleteWorkout(id);
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
            sx={{ color: workoutId === id ? '#52a2aa' : 'grey' }}
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
        <FormPane workout={workout} callback={() => setOpen(false)} />
      </Collapse>
    </div>
  );
};

export default WorkoutRow;
