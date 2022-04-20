import { DocumentData, Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  setDocument,
  setDocumenValue,
  snapshotDocument,
  snapshotDocumentValue,
} from '../repositories/utils';

const COLLECTION = 'workoutItems';
const WORKOUT_TIME_ID = 'workoutTime';
const CHECKED_INDEXES = 'checkedIndexes';
const WORKOUT_ITEMS_ID = 'workoutItems';
const WORKOUT_ROUND_ID = 'workoutRound';

export type WorkoutRound = {
  currentRound: number;
  totalRounds: number;
};

export const INITIAL_WORKOUT_ROUND: WorkoutRound = {
  currentRound: 1,
  totalRounds: 0,
};

export type WorkoutItem = {
  text: string;
  chinese: string;
  pitchesArray: string;
};

export type WorkoutTime = {
  time: number;
  bpm: number;
  isRunning: boolean;
};

export const INITIAL_WORKOUT_TIME: WorkoutTime = {
  time: 0,
  bpm: 0,
  isRunning: false,
};

export const useWorkoutItems = () => {
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [workoutTime, setWorkoutTime] = useState(INITIAL_WORKOUT_TIME);
  const [workoutRound, setWorkoutRound] = useState(INITIAL_WORKOUT_ROUND);

  const _snapshotDocument = useMemo(
    () =>
      function <T>({
        id,
        initialValue,
        setValue,
        buildValue,
      }: {
        id: string;
        initialValue: T;
        setValue: (value: T) => void;
        buildValue: (value: DocumentData) => T;
      }): Unsubscribe {
        return snapshotDocument({
          db,
          id,
          colId: COLLECTION,
          initialValue,
          setValue,
          buildValue,
        });
      },
    []
  );

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

  useEffect(() => {
    const unsub = _snapshotDocument({
      id: WORKOUT_ROUND_ID,
      initialValue: INITIAL_WORKOUT_ROUND,
      setValue: setWorkoutRound,
      buildValue: buildWorkoutRound,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocument({
      id: WORKOUT_TIME_ID,
      initialValue: INITIAL_WORKOUT_TIME,
      setValue: setWorkoutTime,
      buildValue: buildWorkoutTime,
    });
    return () => {
      unsub();
    };
  }, []);

  return { workoutItems, checkedIndexes, workoutTime, workoutRound };
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

  const setWorkoutItems = (value: WorkoutItem[]) =>
    _setDocumentValue({ value, docId: WORKOUT_ITEMS_ID });

  const setCheckedIndexes = (value: number[]) =>
    _setDocumentValue({ value, docId: CHECKED_INDEXES });

  const setWorkoutTime = (workoutTime: WorkoutTime) => {
    _setDocument({ ...workoutTime, id: WORKOUT_TIME_ID });
  };

  const setWorkoutRound = (workoutRound: WorkoutRound) => {
    _setDocument({ ...workoutRound, id: WORKOUT_ROUND_ID });
  };

  return {
    setWorkoutItems,
    setCheckedIndexes,
    setWorkoutTime,
    setWorkoutRound,
  };
};

const buildWorkoutTime = (doc: DocumentData) => {
  const workoutTime: WorkoutTime = {
    time: doc.data().time || 0,
    bpm: doc.data().bpm || 0,
    isRunning: doc.data().isRunning || false,
  };
  return workoutTime;
};

const buildWorkoutRound = (doc: DocumentData) => {
  const workoutRound: WorkoutRound = {
    totalRounds: doc.data().totalRounds || 0,
    currentRound: doc.data().currentRound || 0,
  };
  return workoutRound;
};
