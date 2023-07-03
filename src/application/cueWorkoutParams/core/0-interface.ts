import { ICuePattern } from 'application/cuePattern/core/0-interface';

export interface ICueWorkoutParams {
  colors: string[];
  isRunning: boolean;
  lastPattern: ICuePattern;
  points: number;
  time: number;
}
