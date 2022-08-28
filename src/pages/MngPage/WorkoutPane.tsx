import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';

import WorkoutItemList from './WorkoutItemList';

const WorkoutPane = ({}: {}) => {
  const { state } = useContext(AppContext);
  const [openWorkoutItemList, setOpenWorkoutItemList] = useState(true);
  const workout = state.workouts.find(
    (workout) => workout.id === state.workoutParams.workoutId
  );
  if (!workout) return <></>;
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>{workout.label}</h3>
        <Button onClick={() => setOpenWorkoutItemList(!openWorkoutItemList)}>
          {openWorkoutItemList ? 'hide' : 'open'}
        </Button>
      </div>

      {!!openWorkoutItemList && (
        <>
          <div>{`beatCount: ${workout.beatCount}`}</div>
          <WorkoutItemList
            workoutItems={workout.items}
            cueType={workout.cueType}
            cues={workout.cues}
          />
        </>
      )}
    </>
  );
};

export default WorkoutPane;
