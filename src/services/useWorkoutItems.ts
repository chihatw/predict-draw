import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import { setDocumenValue, snapshotDocumentValue } from '../repositories/utils';

const COLLECTION = 'workoutItems';
const WORKOUT_ITEMS_ID = 'workoutItems';
const CHECKED_INDEXES = 'checkedIndexes';

export type WorkoutItem = {
  text: string;
  chinese: string;
  pitchesArray: string;
};

export const useWorkoutItems = () => {
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  const _snapshotDocumentValue = useMemo(
    () =>
      function <T>({
        docId,
        initialValue,
        setValue,
      }: {
        docId: string;
        initialValue: T;
        setValue: (value: T) => void;
      }): Unsubscribe {
        return snapshotDocumentValue({
          db,
          docId,
          colId: COLLECTION,
          initialValue,
          setValue,
        });
      },
    []
  );

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: WORKOUT_ITEMS_ID,
      initialValue: [],
      setValue: setWorkoutItems,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: CHECKED_INDEXES,
      initialValue: [],
      setValue: setCheckedIndexes,
    });
    return () => {
      unsub();
    };
  }, []);

  return { workoutItems, checkedIndexes };
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

  const setWorkoutItems = (value: WorkoutItem[]) =>
    _setDocumentValue({ value, docId: WORKOUT_ITEMS_ID });

  const setCheckedIndexes = (value: number[]) =>
    _setDocumentValue({ value, docId: CHECKED_INDEXES });

  return { setWorkoutItems, setCheckedIndexes };
};
