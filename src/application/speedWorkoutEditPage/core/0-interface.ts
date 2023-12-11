import { ISpeedWorkoutItem } from '@/application/speedWorkoutItems/core/0-interface';

export interface ISpeedWorkoutEditPage {
  label: string;
  workoutItems: ISpeedWorkoutItem[];
  cueType: string;
  beatCount: number;
}
