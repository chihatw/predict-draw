import { initialState } from 'application/cuePattern/core/1-constants';
import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../infrastructure/firebase';
import { CueWorkoutCue } from '../../Model';
import { Action, ActionTypes } from '../../Update';

const COLLECTIONS = {
  cueWorkout: 'cueWorkout',
};

export const useCueWorkout = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubCue = onSnapshot(
      doc(db, COLLECTIONS.cueWorkout, 'cue'),
      (doc) => {
        console.log('snapShot cueWorkoutCue');
        if (!doc.exists()) return;
        const cue = buildCue(doc);
        dispatch({ type: ActionTypes.setCueWorkoutCue, payload: cue });
      }
    );

    return () => {
      unsubCue();
    };
  }, []);
};

export const setCueWorkoutCue = async (cue: CueWorkoutCue) => {
  console.log('set cueWorkoutCue');
  await setDoc(doc(db, COLLECTIONS.cueWorkout, 'cue'), cue);
};

const buildCue = (doc: DocumentData) => {
  const { nouns, verb, text, header, pattern } = doc.data();
  const cue: CueWorkoutCue = {
    verb: verb || { label: '', pitchStr: '' },
    text: text || '',
    nouns: nouns || [],
    header: header || { label: '', pitchStr: '' },
    pattern: pattern || initialState,
  };
  return cue;
};
