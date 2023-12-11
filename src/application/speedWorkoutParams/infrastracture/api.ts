import { db } from '@/infrastructure/firebase';
import {
    DocumentData,
    arrayUnion,
    doc,
    increment,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import * as _ from 'lodash';
import { ISpeedWorkoutParams } from '../core/0-interface';

export const COLLECTION = 'params';
export const DOCID = 'speedWorkout';

export const changeTotalRounds = async (totalRounds: number) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), { totalRounds });
};

export const reset = () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), {
    bpm: 0,
    updatedAt: new Date().getTime(),
    isRunning: false,
    currentRound: 1,
    checkedIndexes: [],
  });
};

export const selectId = (selectedId: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), { selectedId, bpm: 0 });
};

export const startWorkout = () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), {
    bpm: 0,
    isRunning: true,
  });
};

export const stopWorkout = (bpm: number) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), {
    bpm,
    isRunning: false,
  });
};

export const checkIndex = (index: number) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), {
    checkedIndexes: arrayUnion(index),
  });
};

export const nextRound = () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), {
    checkedIndexes: [],
    currentRound: increment(1),
  });
};

export const listenSpeedWorkoutParams = (
  localSpeedWorkoutParams: ISpeedWorkoutParams,
  callback: (speedWorkoutParams: ISpeedWorkoutParams) => void
) => {
  return onSnapshot(doc(db, COLLECTION, DOCID), (docSnapshot) => {
    console.log(`%cfetched ${COLLECTION}`, 'color:red');
    const speedWorkoutParams = buildSpeedWorkoutParams(docSnapshot);
    if (_.isEqual(localSpeedWorkoutParams, speedWorkoutParams)) return;
    callback(speedWorkoutParams);
  });
};

const buildSpeedWorkoutParams = (doc: DocumentData): ISpeedWorkoutParams => {
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
