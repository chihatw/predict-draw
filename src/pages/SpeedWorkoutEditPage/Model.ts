import { CUE_TYPES, SpeedWorkoutItem } from '../../Model';

export type SpeedWorkoutEditState = {
  label: string;
  cues: string[];
  cueStr: string;
  cueType: string;
  beatCount: number;
  workoutItems: SpeedWorkoutItem[];
  workoutItemStr: string;
};

export const INITIAL_SPEED_WORKOUT_EDIT_STATE: SpeedWorkoutEditState = {
  label: '',
  cues: [],
  cueStr: '',
  cueType: CUE_TYPES.STRING,
  workoutItems: [],
  workoutItemStr: '',
  beatCount: 0,
};
