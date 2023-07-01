import { SpeedWorkout } from '../../../Model';

export type SpeedWorkoutState = {
  isRunning: boolean;
  updatedAt: number;
  miliSeconds: number;
  workout: SpeedWorkout;
  totalRounds: number;
  checkedIndexes: number[];
};
