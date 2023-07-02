import { Container } from '@mui/material';

import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutLabel from '../WorkoutLabel';
import WorkoutStatus from '../WorkoutStatus';
import CueList from './CueList';
import ReadySign from './ReadySign';

const UserSpeedWorkoutCuePane = () => {
  const dispatch = useDispatch();
  const { selectedId, isRunning, checkedIndexes } = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId]
  );

  useEffect(() => {
    dispatch(speedWorkoutsActions.startFetch());
  }, []);

  if (!speedWorkout) return <></>;
  return (
    <Container maxWidth='sm' sx={{ marginTop: 3, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 32 }}>
        <WorkoutLabel
          label={speedWorkout.label}
          beatCount={speedWorkout.beatCount}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WorkoutStatus />
        </div>
        <CueList />
        {!isRunning && !checkedIndexes.length && <ReadySign />}
      </div>
    </Container>
  );
};

export default UserSpeedWorkoutCuePane;
