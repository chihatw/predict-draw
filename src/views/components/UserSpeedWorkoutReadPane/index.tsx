import { CloseRounded } from '@mui/icons-material';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import { Container, IconButton } from '@mui/material';

import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutLabel from '../WorkoutLabel';
import WorkoutStatus from '../WorkoutStatus';

const UserSpeedWorkoutReadPane = () => {
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

  const handleStart = () => {
    dispatch(speedWorkoutParamsActions.startWorkout());
  };
  const handleReset = () => {
    dispatch(speedWorkoutParamsActions.reset());
  };

  if (!speedWorkout) return <></>;
  return (
    <Container maxWidth='sm' sx={{ marginTop: 3 }}>
      <div style={{ display: 'grid', rowGap: 32 }}>
        <WorkoutLabel
          label={speedWorkout.label}
          beatCount={speedWorkout.beatCount}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WorkoutStatus />
        </div>
        <div style={{ height: 32 }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!isRunning && !checkedIndexes.length ? (
            <IconButton onClick={handleStart}>
              <PlayCircleRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
            </IconButton>
          ) : (
            <IconButton onClick={handleReset}>
              <CloseRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
            </IconButton>
          )}
        </div>
      </div>
    </Container>
  );
};

export default UserSpeedWorkoutReadPane;
