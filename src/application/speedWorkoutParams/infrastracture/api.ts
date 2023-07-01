import { DocumentData, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { ISpeedWorkoutParams } from '../core/0-interface';

const COLLECTION = 'params';
const DOCID = 'speedWorkout';

export const fetchSpeedWorkoutParams = async () => {
  console.log(`%cfetch ${COLLECTION}`, 'color:red');

  const docSnapshot = await getDoc(doc(db, COLLECTION, DOCID));

  if (!docSnapshot.exists()) return;
  return buildSpeedWorkoutParams(docSnapshot);
};

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
    selectedId: '',
    currentRound: 1,
    checkedIndexes: [],
  });
};

export const selectId = (selectedId: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOCID), { selectedId });
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
