import { CloseRounded } from '@mui/icons-material';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import { Container, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../../../../App';
import { SpeedWorkoutParams } from '../../../../../Model';
import { setSpeedWorkoutParams } from '../../../../../services/speedWorkout';
import WorkoutLabel from '../commons/WorkoutLabel';
import WorkoutStatus from '../commons/WorkoutStatus';
import { SpeedWorkoutReadState } from './Model';

const SpeedWorkoutReadForm = ({
  state,
  dispatch,
}: {
  state: SpeedWorkoutReadState;
  dispatch: React.Dispatch<SpeedWorkoutReadState>;
}) => {
  const { state: appState } = useContext(AppContext);
  const handleStart = () => {
    const updatedState: SpeedWorkoutReadState = {
      ...state,
      isRunning: false,
    };
    updatedState.isRunning = !state.isRunning;
    dispatch(updatedState);

    const updatedParams: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
    };
    updatedParams.isRunning = !state.isRunning;
    setSpeedWorkoutParams(updatedParams);
  };
  const handleReset = () => {
    const updatedState: SpeedWorkoutReadState = {
      ...state,
      isRunning: false,
      currentRound: 1,
      checkedIndexes: [],
    };
    dispatch(updatedState);

    const updatedParams: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
      checkedIndexes: [],
      currentRound: 1,
      isRunning: false,
    };
    setSpeedWorkoutParams(updatedParams);
  };

  return (
    <Container maxWidth='sm' sx={{ marginTop: 3 }}>
      <div style={{ display: 'grid', rowGap: 32 }}>
        <WorkoutLabel
          label={state.workout.label}
          beatCount={state.workout.beatCount}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WorkoutStatus
            workout={state.workout}
            checkedIndexes={state.checkedIndexes}
            totalRounds={state.totalRounds}
            currentRound={state.currentRound}
          />
        </div>
        <div style={{ height: 32 }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!state.isRunning && !state.checkedIndexes.length ? (
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

export default SpeedWorkoutReadForm;
