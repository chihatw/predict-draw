import { CUE_TYPES, SpeedWorkoutItem } from '../../Model';

export type WorkoutState = {
  label: string;
  beatCount: number;
  workoutItemStr: string;
  workoutItems: SpeedWorkoutItem[];
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
