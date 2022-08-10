import { INITIAL_RANDOM_WORKOUT, RandomWorkout } from '../../Model';

export type RandomWorkoutEditState = Omit<
  RandomWorkout,
  'time' | 'storagePath'
> & {
  cuesStr: string;
};

export const INITIAL_RANDOM_WORKOUT_EDIT_STATE: RandomWorkoutEditState = {
  ...INITIAL_RANDOM_WORKOUT,
  cuesStr: '',
};
