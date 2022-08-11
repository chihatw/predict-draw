import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import {
  Cue,
  INITIAL_RANDOM_WORKOUT_PARAMS,
  RandomWorkout,
  RandomWorkoutParams,
  State,
} from '../Model';
import {
  INITIAL_RANDOM_WORKOUT_EDIT_STATE,
  RandomWorkoutEditState,
} from '../pages/RandomWorkoutEditPage/Model';
import { db, storage } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTIONS = {
  randomWorkouts: 'randomWorkouts',
  randomWorkoutParams: 'randomWorkoutParams',
};

export const useRandomWorkouts = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const q = query(collection(db, COLLECTIONS.randomWorkouts));
    const unsub = onSnapshot(
      q,
      async (querySnapshot) => {
        console.log('snapshot randomWorkouts');
        const randomWorkouts: { [workoutId: string]: RandomWorkout } = {};
        const blobs: { [workoutId: string]: Blob | null } = {};
        const imagePaths: string[] = [];
        const blobURLs: { [imagePath: string]: string } = {};

        querySnapshot.forEach((doc) => {
          const workout = buildRandomWorkout(doc);
          randomWorkouts[workout.id] = workout;
          const { cues } = workout;
          for (const cue of cues) {
            const { imagePath } = cue;
            if (!!imagePath) {
              if (!imagePaths.includes(imagePath)) {
                imagePaths.push(imagePath);
              }
            }
          }
        });

        // blobs
        await Promise.all(
          Object.values(randomWorkouts).map(async (workout) => {
            const { storagePath, id } = workout;
            if (storagePath) {
              // ダウンロード URL を取得
              const url = await getDownloadURL(ref(storage, storagePath));
              console.log('create randomWorkoutBlob');
              // HTTP レスポンスを取得
              const response = await fetch(url);
              // HTTP レスポンス全体から Blob を取得
              const blob = await response.blob();

              blobs[id] = blob;
            } else {
              blobs[id] = null;
            }
          })
        );

        dispatch({
          type: ActionTypes.setRandomWorkouts,
          payload: { randomWorkouts, blobs },
        });
      },
      (err) => {
        console.warn(err);
      }
    );
    return () => unsub();
  }, []);
  return;
};

export const useRandomWorkoutParams = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTIONS.randomWorkoutParams, 'params'),
      (doc) => {
        console.log('snapshot randomWorkoutParams');
        if (!doc.exists()) return;
        const { workoutId, params } = buildRandomWorkoutParams(doc);
        dispatch({
          type: ActionTypes.setRandomWorkoutParams,
          payload: { params, workoutId },
        });
      },
      (err) => {
        console.warn(err);
      }
    );
    return () => unsub();
  }, []);
};

export const setRandomWorkout = async (workout: RandomWorkout) => {
  const { id, ...omitted } = workout;
  console.log('set randomWorkout');
  await setDoc(doc(db, COLLECTIONS.randomWorkouts, id), { ...omitted });
};

export const deleteRandomWorkout = async (workoutId: string) => {
  console.log('delete randomWorkout');
  await deleteDoc(doc(db, COLLECTIONS.randomWorkouts, workoutId));
};

export const setRandomWorkoutId = async (
  workoutId: string,
  cueIds: string[]
) => {
  console.log('update randomWorkoutParams');
  await updateDoc(doc(db, COLLECTIONS.randomWorkoutParams, 'params'), {
    workoutId,
    cueIds,
  });
};

export const startRandomWorkout = async (cueIds: string[]) => {
  console.log('update randomWorkoutParams');
  await updateDoc(doc(db, COLLECTIONS.randomWorkoutParams, 'params'), {
    ...INITIAL_RANDOM_WORKOUT_PARAMS,
    cueIds,
    isRunning: true,
  });
};

export const stopRandomWorkout = async (time: number) => {
  console.log('update randomWorkoutParams');
  await updateDoc(doc(db, COLLECTIONS.randomWorkoutParams, 'params'), {
    time,
    isRunning: false,
    isChecking: true,
  });
};

export const resetRandomWorkout = async () => {
  console.log('update randomWorkoutParams');
  await updateDoc(doc(db, COLLECTIONS.randomWorkoutParams, 'params'), {
    time: 0,
    isRunning: false,
    currentIndex: 0,
    isChecking: false,
  });
};

export const nextCue = async (currentIndex: number) => {
  console.log('update randomWorkoutParams');
  await updateDoc(doc(db, COLLECTIONS.randomWorkoutParams, 'params'), {
    currentIndex,
  });
};

export const buildRandomWorkoutEditInitialState = (
  state: State,
  workoutId: string
): RandomWorkoutEditState => {
  const { randomWorkout } = state;
  const { workouts } = randomWorkout;

  let initialState = INITIAL_RANDOM_WORKOUT_EDIT_STATE;
  if (workouts[workoutId]) {
    const { cues } = workouts[workoutId];
    const cuesStr = cuesToCuesStr(cues);
    initialState = { ...workouts[workoutId], cuesStr };
  }
  return initialState;
};

export const cuesToCuesStr = (cues: Cue[]): string => {
  let lines: string[] = [];
  for (const cue of cues) {
    const { label, pitchStr } = cue;
    lines.push(label);
    lines.push(pitchStr);
  }
  return lines.join('\n');
};

export const cuesStrToCues = (cuesStr: string, cues: Cue[]): Cue[] => {
  const labels: string[] = [];
  const pitchStrs: string[] = [];

  const lines = cuesStr.split('\n');
  lines.forEach((line, index) => {
    if (index % 2) {
      pitchStrs.push(line);
    } else {
      labels.push(line);
    }
  });
  return labels.map((label, index) => ({
    id: nanoid(4),
    label,
    pitchStr: pitchStrs[index] || '',
    imagePath: cues[index]?.imagePath || '',
  }));
};

export const calcBeatCount = (cues: Cue[]): number => {
  let beatCount = 0;
  for (const cue of cues) {
    const { pitchStr } = cue;
    const pitchesArray = string2PitchesArray(pitchStr);
    for (const wordPich of pitchesArray) {
      beatCount += wordPich.length / 2;
    }
  }
  return Math.ceil(beatCount);
};

const buildRandomWorkout = (doc: DocumentData): RandomWorkout => {
  const { beatCount, cues, roundCount, storagePath, targetBpm, time, title } =
    doc.data();
  const randomWorkout: RandomWorkout = {
    id: doc.id,
    beatCount: beatCount || 0,
    cues: cues || [],
    roundCount: roundCount || 0,
    storagePath: storagePath || '',
    targetBpm: targetBpm || 0,
    time: time || 0,
    title: title || '',
  };
  return randomWorkout;
};

const buildRandomWorkoutParams = (
  doc: DocumentData
): { params: RandomWorkoutParams; workoutId: string } => {
  const { time, cueIds, isRunning, currentIndex, workoutId, isChecking } =
    doc.data();
  const params: RandomWorkoutParams = {
    time: time || 0,
    cueIds: cueIds || [],
    isRunning: isRunning || false,
    currentIndex: currentIndex || 0,
    isChecking: isChecking || false,
    blob: null,
  };
  return { params, workoutId: workoutId || '' };
};
