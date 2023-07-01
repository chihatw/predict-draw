import { Container } from '@mui/material';

import { RootState } from 'main';
import { useSelector } from 'react-redux';
import WorkoutLabel from '../../WorkoutLabel';
import WorkoutStatus from '../../WorkoutStatus';
import CueList from './CueList';
import ReadySign from './ReadySign';

const SpeedWorkoutCuePane = () => {
  const { selectedId, isRunning, checkedIndexes } = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId]
  );

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

export default SpeedWorkoutCuePane;
