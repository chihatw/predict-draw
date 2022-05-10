import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Collapse } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppContext from '../../../../services/context';
import FormPane from './FormPane';
import WorkoutRow from './WorkoutRow';

const WorkoutsPane = () => {
  const { workouts } = useContext(AppContext);
  const [openForm, setOpenForm] = useState(false);

  const handleClickAdd = () => {
    setOpenForm(!openForm);
  };
  return (
    <div>
      <h3>Workouts</h3>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <Button onClick={handleClickAdd} sx={{ justifyContent: 'flex-start' }}>
          {openForm ? 'Cancel' : 'Create New Workout'}
        </Button>
        <Collapse in={openForm}>
          <FormPane callback={() => setOpenForm(false)} />
        </Collapse>
        <div style={{ display: 'grid', rowGap: 8 }}>
          {workouts.map((workout, index) => (
            <WorkoutRow workout={workout} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPane;
