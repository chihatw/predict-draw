import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import {
  INITIAL_WORKOUT_ROUND,
  INITIAL_WORKOUT_TIME,
  WorkoutId,
  WorkoutParams,
  WorkoutTime,
} from '../Model';

import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTIONS = {
  workoutParams: 'workoutParams',
};

export const useWorkoutParams = (dispatch: React.Dispatch<Action> | null) => {
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTIONS.workoutParams, 'params'),
      (doc) => {
        console.log('snapshot workoutParams');
        if (!doc.exists() || !dispatch) return;
        const workoutParams = buildWorkoutParams(doc);
        console.log({ workoutParams });
        dispatch({
          type: ActionTypes.setWorkoutParams,
          payload: workoutParams,
        });
      },
      (err) => {
        console.warn(err);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return;
};

export const setWorkoutId = (workoutId: string) => {
  console.log('update workoutParams');
  updateDoc(doc(db, COLLECTIONS.workoutParams, 'params'), {
    workoutId,
  });
};

export const resetWorkoutParams = async (totalRounds: number) => {
  console.log('update workoutParams');
  await updateDoc(doc(db, COLLECTIONS.workoutParams, 'params'), {
    ...INITIAL_WORKOUT_TIME,
    ...INITIAL_WORKOUT_ROUND,
    totalRounds,
    checkedIndexes: [],
  });
};

export const startRunning = async () => {
  console.log('update workoutParams');
  await updateDoc(doc(db, COLLECTIONS.workoutParams, 'params'), {
    ...INITIAL_WORKOUT_TIME,
    isRunning: true,
  });
};

export const setWorkoutTime = async (workoutTime: WorkoutTime) => {
  console.log('update workoutParams');
  await updateDoc(doc(db, COLLECTIONS.workoutParams, 'params'), {
    ...workoutTime,
  });
};

export const setCheckedIndexes = async (checkedIndexes: number[]) => {
  console.log('update workoutParams');
  await updateDoc(doc(db, COLLECTIONS.workoutParams, 'params'), {
    checkedIndexes,
  });
};

export const setCurrentRound = async (
  currentRound: number,
  totalRounds: number
) => {
  console.log('update workoutParams');
  await updateDoc(doc(db, COLLECTIONS.workoutParams, 'params'), {
    currentRound,
    totalRounds,
    checkedIndexes: [],
  });
};

const buildWorkoutParams = (doc: DocumentData): WorkoutParams => {
  const {
    bpm,
    checkedIndexes,
    currentRound,
    isRunning,
    time,
    totalRounds,
    workoutId,
  } = doc.data();
  const workoutParams: WorkoutParams = {
    bpm: bpm || -1,
    checkedIndexes: checkedIndexes || [],
    currentRound: currentRound || 1,
    isRunning: isRunning || false,
    time: time || 0,
    totalRounds: totalRounds || 0,
    workoutId: workoutId || '',
  };
  return workoutParams;
};
