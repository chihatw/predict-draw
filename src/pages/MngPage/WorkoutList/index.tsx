import { Button, Collapse } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../App';
import WorkoutForm from '../WorkoutForm';
import WorkoutRow from './WorkoutRow';

const WorkoutList = () => {
  const { state } = useContext(AppContext);
  const { workouts } = state;
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickAdd = () => {
    setOpenForm(!openForm);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Workouts</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <Button
            onClick={handleClickAdd}
            sx={{ justifyContent: 'flex-start' }}
          >
            {openForm ? 'Cancel' : 'Create New Workout'}
          </Button>
          <Collapse in={openForm}>
            <WorkoutForm callback={() => setOpenForm(false)} />
          </Collapse>
          <div style={{ display: 'grid', rowGap: 8 }}>
            {workouts.map((_, index) => (
              <WorkoutRow key={index} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
