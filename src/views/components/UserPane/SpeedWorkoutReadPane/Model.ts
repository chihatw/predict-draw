import { INITIAL_WORKOUT, SpeedWorkout, State } from '../../../../Model';

export type SpeedWorkoutReadState = {
  workout: SpeedWorkout;
  checkedIndexes: number[];
  isRunning: boolean;
  totalRounds: number;
  currentRound: number;
};

export const INITIAL_SPEED_WORKOUT_READ_STATE: SpeedWorkoutReadState = {
  workout: INITIAL_WORKOUT,
  checkedIndexes: [],
  isRunning: false,
  totalRounds: 1,
  currentRound: 1,
};

export const buildSpeedWorkoutReadState = (
  state: State
): SpeedWorkoutReadState => {
  const workout =
    state.speedWorkouts[state.params.speedWorkout.selectedId] ||
    INITIAL_WORKOUT;

  return {
    workout,
    checkedIndexes: state.params.speedWorkout.checkedIndexes,
    isRunning: state.params.speedWorkout.isRunning,
    totalRounds: state.params.speedWorkout.totalRounds,
    currentRound: state.params.speedWorkout.currentRound,
  };
};
