import { ISpeedWorkoutItem } from '@/application/speedWorkoutItems/core/0-interface';
import {
    IRemoteSpeedWorkout,
    ISpeedWorkout,
} from '@/application/speedWorkouts/core/0-interface';
import { CUE_TYPES } from '@/application/speedWorkouts/core/1-constants';
import { nanoid } from 'nanoid';
import { ISpeedWorkoutEditPage } from './0-interface';

export const buildSpeedWorkoutItemsStr = (
  workoutItems: ISpeedWorkoutItem[]
) => {
  return workoutItems
    .map((workoutItem) => buildWorkoutItemStr(workoutItem))
    .join('\n');
};

const buildWorkoutItemStr = (workoutItem: ISpeedWorkoutItem) => {
  return [
    workoutItem.text,
    workoutItem.chinese,
    workoutItem.pitchStr,
    workoutItem.cuePitchStr,
  ].join('\n');
};

export const buildSpeedWorkoutItems = (value: string) => {
  const workoutItems: ISpeedWorkoutItem[] = [];
  const lines = value.split('\n');
  for (let i = 0; i < lines.length; i = i + 4) {
    const text = lines[i];
    const chinese = lines[i + 1] || '';
    const pitchStr = lines[i + 2] || '';
    const cuePitchStr = lines[i + 3] || '';

    if (!text && !chinese && !pitchStr && !cuePitchStr) continue;

    const workoutItem: ISpeedWorkoutItem = {
      tempId: nanoid(8),
      text,
      chinese,
      pitchStr,
      cuePitchStr,
    };
    workoutItems.push(workoutItem);
  }
  return workoutItems;
};

export const buildRemoteSpeedWorkout = (props: ISpeedWorkoutEditPage) => {
  const workout: Omit<IRemoteSpeedWorkout, 'createdAt'> = {
    beatCount: props.beatCount,
    cueType: props.cueType,
    cues: buildCues(props.workoutItems, props.cueType),
    items: buildItems(props.workoutItems),
    label: props.label,
  };
  return workout;
};

const buildCues = (workoutItems: ISpeedWorkoutItem[], cueType: string) => {
  return workoutItems.map((workoutItem) => {
    switch (cueType) {
      case CUE_TYPES.STRING:
        return workoutItem.chinese;
      case CUE_TYPES.PITCH:
        return workoutItem.cuePitchStr;
      default:
        return '';
    }
  });
};

const buildItems = (workoutItems: ISpeedWorkoutItem[]) => {
  return workoutItems.map((workoutItem) => ({
    text: workoutItem.text,
    chinese: workoutItem.chinese,
    pitchStr: workoutItem.pitchStr,
    cuePitchStr: workoutItem.cuePitchStr,
  }));
};

export const buildSpeedWorkout = (
  workoutId: string,
  props: ISpeedWorkoutEditPage
) => {
  const speedWorkout: ISpeedWorkout = {
    id: workoutId,
    beatCount: props.beatCount,
    createdAt: performance.now(),
    cueType: props.cueType,
    itemTempIds: props.workoutItems.map((item) => item.tempId),
    label: props.label,
  };
  return speedWorkout;
};
