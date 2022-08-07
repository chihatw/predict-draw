import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo } from 'react';
import { workoutItems2String } from 'workout-items';
import { Workout } from '../Model';
import { WorkoutState } from '../pages/MngPage/Model';

import { db } from '../repositories/firebase';
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from '../repositories/utils';
import { Action, ActionTypes } from '../Update';

export const CUE_TYPES = { STRING: 'string', PITCH: 'pitchesArray' };

const COLLECTIONS = { workouts: 'workouts' };

const COLLECTION = 'workouts';

export const useWorkouts = (dispatch: React.Dispatch<Action> | null) => {
  useEffect(() => {
    const q = query(
      collection(db, COLLECTIONS.workouts),
      orderBy('createdAt', 'desc'),
      limit(6)
    );
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        console.log('snapshot workouts');
        if (!dispatch) return;
        let workouts: Workout[] = [];
        querySnapshot.forEach((doc) => {
          workouts.push(buildWorkout(doc));
        });
        dispatch({ type: ActionTypes.setWorkouts, payload: workouts });
      },
      (err) => {
        console.warn(err);
      }
    );
    return () => unsub();
  }, []);

  return;
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

export const setWorkout = async (workout: Workout) => {
  const { id, ...omitted } = workout;
  console.log('set workout');
  setDoc(doc(db, COLLECTIONS.workouts, id), { ...omitted });
};

export const deleteWorkout = async (workoutId: string) => {
  console.log('delete workout');
  deleteDoc(doc(db, COLLECTIONS.workouts, workoutId));
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

export const buildInitialWorkoutState = (workout: Workout): WorkoutState => {
  const { cueType, cues, items: workoutItems, beatCount, label } = workout;

  return {
    cues,
    label,
    cueStr: cues.join('\n'),
    cueType,
    beatCount,
    workoutItems,
    workoutItemStr: workoutItems2String(workoutItems),
  };
};
