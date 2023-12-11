import { CUE_TYPES } from '@/application/speedWorkouts/core/1-constants';
import { ISpeedWorkoutEditPage } from './0-interface';

export const initialState: ISpeedWorkoutEditPage = {
  label: '',
  workoutItems: [],
  cueType: CUE_TYPES.STRING,
  beatCount: 0,
};
