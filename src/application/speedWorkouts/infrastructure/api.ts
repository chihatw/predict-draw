import { ISpeedWorkoutItem } from 'application/speedWorkoutItems/core/0-interface';
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { nanoid } from 'nanoid';
import { IRemoteSpeedWorkout, ISpeedWorkout } from '../core/0-interface';

const COLLECTION = 'workouts';

export const fetchSpeedWorkouts = async () => {
  console.log(`%cfetch ${COLLECTION}`, 'color:red');

  const q = query(collection(db, COLLECTION));

  const querySnapshot = await getDocs(q);

  const speedWorkouts: ISpeedWorkout[] = [];
  let speedWorkoutItems: ISpeedWorkoutItem[] = [];

  querySnapshot.forEach((doc) => {
    const { workout, workoutItems } = buildSpeedWorkout(doc);
    console.log({ workout, workoutItems });
    speedWorkouts.push(workout);
    speedWorkoutItems = speedWorkoutItems.concat(workoutItems);
  });

  return { speedWorkouts, speedWorkoutItems };
};

const buildSpeedWorkout = (
  doc: DocumentData
): { workout: ISpeedWorkout; workoutItems: ISpeedWorkoutItem[] } => {
  const { beatCount, createdAt, cueType, cues, items, label } = doc.data();

  let workoutItems: ISpeedWorkoutItem[] = [];

  for (const item of items as {
    chinese: string;
    pitchStr: string;
    text: string;
    cuePitchStr: string;
  }[]) {
    const tempId = nanoid(8);
    workoutItems.push({
      chinese: item.chinese,
      pitchStr: item.pitchStr || '',
      tempId,
      text: item.text,
      cuePitchStr: item.cuePitchStr || '',
    });
  }

  const workout: ISpeedWorkout = {
    id: doc.id,
    beatCount,
    createdAt,
    cueType,
    label,
    itemTempIds: buildItemTempIds(cues, workoutItems),
  };
  return { workoutItems, workout };
};

const buildItemTempIds = (
  cues: string[],
  workoutItems: ISpeedWorkoutItem[]
) => {
  const itemTempIds: string[] = [];
  for (const cue of cues) {
    const target = workoutItems.find((item) => item.chinese === cue); // cutType string のみ対応
    if (!target) continue;
    itemTempIds.push(target!.tempId);
  }
  return itemTempIds;
};

export const updateSpeedWorkout = async (
  workoutId: string,
  workout: Omit<IRemoteSpeedWorkout, 'createdAt'>
) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, workoutId), { ...workout });
};
