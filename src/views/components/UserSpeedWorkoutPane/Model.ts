import { INITIAL_WORKOUT, SpeedWorkout } from '../../../Model';

export type SpeedWorkoutState = {
  isRunning: boolean;
  updatedAt: number;
  miliSeconds: number;
  workout: SpeedWorkout;
  totalRounds: number;
  checkedIndexes: number[];
};

export const INITIAL_SPEED_READING_STATE: SpeedWorkoutState = {
  isRunning: false,
  updatedAt: 0,
  miliSeconds: 0,
  workout: INITIAL_WORKOUT,
  totalRounds: 0,
  checkedIndexes: [],
};
