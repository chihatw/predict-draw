import { doc, setDoc } from 'firebase/firestore';
import { workoutItems2String } from 'workout-items';

import { ISpeedWorkoutParams } from 'application/speedWorkoutParams/core/0-interface';
import {
  INITIAL_SPEED_WORKOUT_EDIT_STATE,
  SpeedWorkoutEditState,
} from 'views/pages/SpeedWorkoutEditPage/Model';
import { db } from '../infrastructure/firebase';
import { SpeedWorkout, State } from '../Model';

const COLLECTIONS = { params: 'params', workouts: 'workouts' };

export const setSpeedWorkoutParams = (params: ISpeedWorkoutParams) => {
  console.log('set speedWorkoutParams');
  setDoc(doc(db, COLLECTIONS.params, 'speedWorkout'), params);
};

export const setSpeedWorkout = (workout: SpeedWorkout) => {
  console.log('set speedWorkout');
  const { id, ...omitted } = workout;
  setDoc(doc(db, COLLECTIONS.workouts, id), { ...omitted });
};

export const buildSpeedWorkoutEditState = (
  state: State,
  workoutId: string
): SpeedWorkoutEditState => {
  const speedWorkout = state.speedWorkouts[workoutId];
  if (!speedWorkout) return INITIAL_SPEED_WORKOUT_EDIT_STATE;

  return {
    label: speedWorkout.label,
    cues: speedWorkout.cues,
    cueStr: speedWorkout.cues.join('\n'),
    cueType: speedWorkout.cueType,
    beatCount: speedWorkout.beatCount,
    workoutItems: speedWorkout.items,
    workoutItemStr: workoutItems2String(speedWorkout.items),
  };
};
