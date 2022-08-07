import { WorkoutItem } from '../../Model';
import { CUE_TYPES } from '../../services/workout';

export type WorkoutState = {
  label: string;
  beatCount: number;
  workoutItemStr: string;
  workoutItems: WorkoutItem[];
  cueType: string;
  cueStr: string;
  cues: string[];
};
export const INITIAL_WORKOUT_STATE: WorkoutState = {
  label: '',
  beatCount: 0,
  workoutItems: [],
  workoutItemStr: '',
  cueType: CUE_TYPES.STRING,
  cueStr: '',
  cues: [],
};
