import {
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { INITIAL_WORKING_MEMORY, State, WorkingMemory } from '../Model';
import {
  INITIAL_WORKING_MEMORY_FORM_STATE,
  WorkingMemoryFormState,
} from '../pages/User/UserPane/WorkingMemoryPane/Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { getRandomInt } from './utils';

const COLLECTIONS = {
  workingMemoryWorkouts: 'workingMemoryWorkouts',
};

export const useWorkingMemoryWorkout = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubWorkingMemory = onSnapshot(
      doc(db, COLLECTIONS.workingMemoryWorkouts, 'workout'),
      async (doc) => {
        console.log('snapshot workingMemoryWorkout');
        if (!doc.exists()) return;
        const workingMemory = buildWorkingMemory(doc);
        dispatch({
          type: ActionTypes.setWorkingMemory,
          payload: { workingMemory, blob: null },
        });
      }
    );
    const unsubWorkingMemoryAnswerIds = onSnapshot(
      doc(db, COLLECTIONS.workingMemoryWorkouts, 'monitor'),
      (doc) => {
        console.log('snapshot workingMemoryWorkout AnswerIds');
        if (!doc.exists()) return;
        const answerIds = doc.data().answerIds;
        dispatch({
          type: ActionTypes.setWorkingMemoryAnswerIds,
          payload: answerIds,
        });
      }
    );
    return () => {
      unsubWorkingMemory();
      unsubWorkingMemoryAnswerIds();
    };
  }, []);
};

export const setWorkingMemory = (workingMemory: WorkingMemory) => {
  for (const key of Object.keys(workingMemory)) {
    if (!Object.keys(INITIAL_WORKING_MEMORY).includes(key)) {
      delete workingMemory[key as keyof WorkingMemory];
    }
  }
  const { id, ...omitted } = workingMemory;
  console.log('set workingMemory');
  setDoc(doc(db, COLLECTIONS.workingMemoryWorkouts, id), { ...omitted });
};

export const updateWorkingMemoryCueIds = (cueIds: string[]) => {
  console.log('update workingMemory cueIds');
  updateDoc(doc(db, COLLECTIONS.workingMemoryWorkouts, 'workout'), { cueIds });
};

export const setWorkingMemoryAnswerIds = (answerIds: string[]) => {
  console.log('set workingMemory answerIds');
  setDoc(doc(db, COLLECTIONS.workingMemoryWorkouts, 'monitor'), { answerIds });
};

export const buildWorkingMemoryFormState = (
  state: State
): WorkingMemoryFormState => {
  const workingMemoryFormState: WorkingMemoryFormState = {
    ...state.workingMemory,
    audioContext: state.audioContext,
    blob: state.blobs[state.workingMemory.storagePath],
    answerIds: [],
    currentIndex: 0,
  };
  for (const key of Object.keys(workingMemoryFormState)) {
    if (!Object.keys(INITIAL_WORKING_MEMORY_FORM_STATE).includes(key)) {
      delete workingMemoryFormState[key as keyof WorkingMemoryFormState];
    }
  }

  return workingMemoryFormState;
};

const buildWorkingMemory = (doc: DocumentData): WorkingMemory => {
  const { cues, cueIds, offset, cueCount, storagePath } = doc.data();

  return {
    id: doc.id,
    cues: cues || {},
    cueIds: cueIds || [],
    offset: offset || 0,
    cueCount: cueCount || 0,
    storagePath: storagePath || '',
  };
};

export const buildCueIds = (ids: string[], cueCount: number) => {
  const cueIds: string[] = [];
  for (let i = 0; i < cueCount; i++) {
    const index = getRandomInt(ids.length);
    cueIds.push(ids[index]);
  }
  return cueIds;
};
