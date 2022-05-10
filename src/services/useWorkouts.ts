import {
  DocumentData,
  limit,
  orderBy,
  QueryConstraint,
  Unsubscribe,
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  addDocument,
  deleteDocument,
  snapshotCollection,
  updateDocument,
} from '../repositories/utils';
import { WorkoutItem } from 'workout-items';

export const CUE_TYPES = { STRING: 'string', PITCH: 'pitchesArray' };

export type Workout = {
  id: string;
  cues: string[];
  items: WorkoutItem[];
  label: string;
  cueType: string;
  beatCount: number;
  createdAt: number;
};

export const INITIAL_WORKOUT: Workout = {
  id: '',
  items: [],
  label: '',
  beatCount: 0,
  createdAt: 0,
  cueType: '',
  cues: [],
};

const COLLECTION = 'workouts';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const _snapshotCollection = useMemo(
    () =>
      function <T>({
        queries,
        setValues,
        buildValue,
      }: {
        queries?: QueryConstraint[];
        setValues: (value: T[]) => void;
        buildValue: (value: DocumentData) => T;
      }): Unsubscribe {
        return snapshotCollection({
          db,
          colId: COLLECTION,
          queries,
          setValues,
          buildValue,
        });
      },
    []
  );

  useEffect(() => {
    const unsub = _snapshotCollection({
      queries: [orderBy('createdAt', 'desc'), limit(6)],
      setValues: setWorkouts,
      buildValue: buildWorkout,
    });
    return () => {
      unsub();
    };
  }, []);

  return { workouts };
};

export const useHandleWorkouts = () => {
  const _addDocument = useMemo(
    () =>
      async function <T extends { id: string }>(
        value: Omit<T, 'id'>
      ): Promise<T | null> {
        return await addDocument({
          db,
          colId: COLLECTION,
          value,
        });
      },
    []
  );

  const _updateDocument = useMemo(
    () =>
      async function <T extends { id: string }>(value: T): Promise<T | null> {
        return await updateDocument({
          db,
          colId: COLLECTION,
          value,
        });
      },
    []
  );

  const _deleteDocument = useCallback(async (id: string) => {
    return await deleteDocument({ db, colId: COLLECTION, id });
  }, []);
  const addWorkout = async (workout: Omit<Workout, 'id'>) => {
    return await _addDocument(workout);
  };
  const updateWorkout = async (workout: Workout) => {
    return await _updateDocument(workout);
  };
  const deleteWorkout = async (id: string) => {
    return await _deleteDocument(id);
  };
  return { addWorkout, updateWorkout, deleteWorkout };
};

const buildWorkout = (doc: DocumentData) => {
  const { id } = doc;
  const { createdAt, label, items, beatCount, cues, cueType } = doc.data();
  const workout: Workout = {
    id: id || '',
    cues: cues || [],
    label: label || '',
    items: items || [],
    cueType: cueType || '',
    beatCount: beatCount || 0,
    createdAt: createdAt || 0,
  };
  return workout;
};
