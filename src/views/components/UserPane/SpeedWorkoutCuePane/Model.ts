import { INITIAL_WORKOUT, SpeedWorkout, State } from '../../../../Model';

export type SpeedWorkoutCueState = {
  checkedIndexes: number[];
  workout: SpeedWorkout;
  isRunning: boolean;
  totalRounds: number;
  currentRound: number;
};

export const INITIAL_SPEED_WORKOUT_CUE_STATE: SpeedWorkoutCueState = {
  checkedIndexes: [],
  workout: INITIAL_WORKOUT,
  isRunning: false,
  totalRounds: 1,
  currentRound: 1,
};

export const buildSpeedWorkoutCueState = (
  state: State
): SpeedWorkoutCueState => {
  const workout =
    state.speedWorkouts[state.params.speedWorkout.selectedId] ||
    INITIAL_WORKOUT;
  return {
    checkedIndexes: state.params.speedWorkout.checkedIndexes,
    workout,
    isRunning: state.params.speedWorkout.isRunning,
    totalRounds: state.params.speedWorkout.totalRounds,
    currentRound: state.params.speedWorkout.currentRound,
  };
};
