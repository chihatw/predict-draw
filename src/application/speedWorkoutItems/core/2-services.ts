import { string2PitchesArray } from 'application/utils/string2PitchesArray';
import { ISpeedWorkoutItem } from './0-interface';

export const calcBeatCount = (workoutItems: ISpeedWorkoutItem[]) => {
  const moraCount = workoutItems.reduce((accumulator, workoutItem) => {
    const itemMoraCount = string2PitchesArray(workoutItem.pitchStr).flat()
      .length;
    return accumulator + itemMoraCount;
  }, 0);
  return Math.ceil(moraCount / 2);
};
