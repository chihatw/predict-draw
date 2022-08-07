import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useMemo } from 'react';
import {
  INITIAL_WORKOUT_ROUND,
  INITIAL_WORKOUT_TIME,
  WorkoutId,
  WorkoutRound,
  WorkoutTime,
} from '../Model';

import { db } from '../repositories/firebase';
import { setDocument, setDocumenValue } from '../repositories/utils';
import { Action, ActionTypes } from '../Update';

const COLLECTIONS = {
  workoutItems: 'workoutItems',
};

const COLLECTION = 'workoutItems';

const WORKOUT_TIME_ID = 'workoutTime';
const CHECKED_INDEXES = 'checkedIndexes';
const WORKOUT_ROUND_ID = 'workoutRound';
const WORKOUT_ID_ID = 'workoutId';

export const useWorkoutParams = (dispatch: React.Dispatch<Action> | null) => {
  useEffect(() => {
    const unsubWorkoutId = onSnapshot(
      doc(db, COLLECTIONS.workoutItems, 'workoutId'),
      (doc) => {
        console.log('snapshot workoutId');
        if (!doc.exists() || !dispatch) return;
        const workoutId = buildWorkoutId(doc);
        dispatch({ type: ActionTypes.setWorkoutId, payload: workoutId });
      },
      (err) => {
        console.warn(err);
      }
    );
    const unsubRounds = onSnapshot(
      doc(db, COLLECTIONS.workoutItems, 'workoutRound'),
      (doc) => {
        console.log('snapshot workoutRound');
        if (!doc.exists() || !dispatch) return;
        const { totalRounds, currentRound } = buildWorkoutRound(doc);
        dispatch({
          type: ActionTypes.setRounds,
          payload: { totalRounds, currentRound },
        });
      },
      (err) => {
        console.warn(err);
      }
    );
    const unsubWorkoutTime = onSnapshot(
      doc(db, COLLECTIONS.workoutItems, 'workoutTime'),
      (doc) => {
        console.log('snapshot workoutTime');
        if (!doc.exists() || !dispatch) return;
        const { time, isRunning, bpm } = buildWorkoutTime(doc);
        dispatch({
          type: ActionTypes.setWorkoutTime,
          payload: { time, bpm, isRunning },
        });
      },
      (err) => {
        console.warn(err);
      }
    );
    const unsubCheckedIndexes = onSnapshot(
      doc(db, COLLECTIONS.workoutItems, 'checkedIndexes'),
      (doc) => {
        console.log('snapshot checkedIndexes');
        if (!doc.exists() || !dispatch) return;
        const checkedIndexes = buildCheckedIndexes(doc);
        dispatch({
          type: ActionTypes.setCheckedIndexes,
          payload: checkedIndexes,
        });
      },
      (err) => console.warn(err)
    );
    return () => {
      unsubWorkoutId();
      unsubRounds();
      unsubWorkoutTime();
      unsubCheckedIndexes();
    };
  }, []);

  return;
};

export const useHandleWorkoutItems = () => {
  const _setDocumentValue = useMemo(
    () =>
      function <T>({ value, docId }: { value: T; docId: string }) {
        setDocumenValue({
          db,
          value,
          colId: COLLECTION,
          docId,
        });
      },
    []
  );
  const _setDocument = useMemo(
    () =>
      async function <T extends { id: string }>(value: T) {
        return await setDocument({
          db,
          value,
          colId: COLLECTION,
        });
      },
    []
  );

  const setCheckedIndexes = (value: number[]) =>
    _setDocumentValue({ value, docId: CHECKED_INDEXES });

  const setWorkoutTime = (workoutTime: WorkoutTime) => {
    _setDocument({ ...workoutTime, id: WORKOUT_TIME_ID });
  };

  const setWorkoutRound = (workoutRound: WorkoutRound) => {
    _setDocument({ ...workoutRound, id: WORKOUT_ROUND_ID });
  };

  const setWorkoutId = (workoutId: string) => {
    _setDocument({ value: workoutId, id: WORKOUT_ID_ID });
  };

  return {
    setWorkoutId,
    setWorkoutTime,
    setWorkoutRound,
    setCheckedIndexes,
  };
};

export const setWorkoutId = (workoutId: WorkoutId) => {
  const { id, ...omitted } = workoutId;
  console.log('set workoutId');
  setDoc(doc(db, COLLECTIONS.workoutItems, id), { ...omitted });
};

export const updateTotalRounds = async (totalRounds: number) => {
  console.log('update workoutRound');
  await setDoc(doc(db, COLLECTIONS.workoutItems, 'workoutRound'), {
    ...INITIAL_WORKOUT_ROUND,
    totalRounds,
  });

  console.log('update workoutTime');
  await setDoc(
    doc(db, COLLECTIONS.workoutItems, 'workoutTime'),
    INITIAL_WORKOUT_TIME
  );

  console.log('update checkedIndexes');
  await setDoc(doc(db, COLLECTIONS.workoutItems, 'checkedIndexes'), {
    value: [],
  });
};

export const startBpmCalc = async () => {
  console.log('update workoutTime');
  await setDoc(doc(db, COLLECTIONS.workoutItems, 'workoutTime'), {
    ...INITIAL_WORKOUT_TIME,
    isRunning: true,
  });
};

export const setBpmCalc = async (workoutTime: WorkoutTime) => {
  console.log('update workoutTime');
  await setDoc(doc(db, COLLECTIONS.workoutItems, 'workoutTime'), workoutTime);
};

const buildWorkoutTime = (doc: DocumentData) => {
  const {
    time,
    bpm,
    isRunning,
  }: { time: number; bpm: number; isRunning: boolean } = doc.data();
  return { time: time || 0, bpm: bpm || -1, isRunning: isRunning || false };
};

const buildWorkoutRound = (doc: DocumentData) => {
  const {
    totalRounds,
    currentRound,
  }: { totalRounds: number; currentRound: number } = doc.data();

  return {
    totalRounds: totalRounds || 0,
    currentRound: currentRound || 0,
  };
};

const buildWorkoutId = (doc: DocumentData) => {
  const { value }: { value: string } = doc.data();
  return value || '';
};

const buildCheckedIndexes = (doc: DocumentData) => {
  const { value }: { value: number[] } = doc.data();
  return value || [];
};
