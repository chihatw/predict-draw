import React from 'react';
import EditTotalRoundsPane from './components/EditTotalRoundsPane';
import StatusPane from './components/StatusPane';
import WorkoutsPane from './components/WorkoutsPane';
import WorkoutPane from './components/WorkoutPane';

const MngWorkoutPane = () => {
  return (
    <div style={{ display: 'grid', rowGap: 16, paddingBottom: 80 }}>
      <StatusPane />
      <EditTotalRoundsPane />
      <WorkoutPane />
      <WorkoutsPane />
    </div>
  );
};

export default MngWorkoutPane;
