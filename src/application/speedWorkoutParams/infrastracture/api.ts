import {
  DocumentData,
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { ISpeedWorkoutParams } from '../core/0-interface';

export const SPEED_WORKOUT_COLLECTION = 'params';
export const DOCID = 'speedWorkout';

export const fetchSpeedWorkoutParams = async () => {
  console.log(`%cfetch ${SPEED_WORKOUT_COLLECTION}`, 'color:red');

  const docSnapshot = await getDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID));

  if (!docSnapshot.exists()) return;
  return buildSpeedWorkoutParams(docSnapshot);
};

export const changeTotalRounds = async (totalRounds: number) => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), { totalRounds });
};

export const reset = () => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), {
    bpm: 0,
    updatedAt: new Date().getTime(),
    isRunning: false,
    currentRound: 1,
    checkedIndexes: [],
  });
};

export const selectId = (selectedId: string) => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), { selectedId, bpm: 0 });
};

export const startWorkout = () => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), {
    bpm: 0,
    isRunning: true,
  });
};

export const stopWorkout = (bpm: number) => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), {
    bpm,
    isRunning: false,
  });
};

export const checkIndex = (index: number) => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), {
    checkedIndexes: arrayUnion(index),
  });
};

export const nextRound = () => {
  console.log(`%cupdate ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
  updateDoc(doc(db, SPEED_WORKOUT_COLLECTION, DOCID), {
    checkedIndexes: [],
    currentRound: increment(1),
  });
};

export const buildSpeedWorkoutParams = (
  doc: DocumentData
): ISpeedWorkoutParams => {
  const {
    bpm,
    checkedIndexes,
    updatedAt,
    isRunning,
    selectedId,
    totalRounds,
    currentRound,
  } = doc.data();
  return {
    bpm: bpm || 0,
    checkedIndexes: checkedIndexes || [],
    updatedAt: updatedAt || 0,
    isRunning: isRunning || false,
    selectedId: selectedId || '',
    totalRounds: totalRounds || 0,
    currentRound: currentRound || 0,
  };
};
