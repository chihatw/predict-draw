import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../infrastructure/firebase';
import {
  CueWorkoutCue,
  INITIAL_CUE_CARD_PROPS,
  INITIAL_PATTERN,
} from '../../Model';
import { Action, ActionTypes } from '../../Update';
import { CUE_CARDS } from '../../views/components/UserCueWorkoutPane/CUE_CARDS';

const COLLECTIONS = {
  cueWorkout: 'cueWorkout',
};

export const useCueWorkout = (dispatch: React.Dispatch<Action>) => {
  // これ何のための初期化？
  useEffect(() => {
    dispatch({ type: ActionTypes.setCueWorkoutCards, payload: CUE_CARDS });
  }, []);

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
    verb: verb || INITIAL_CUE_CARD_PROPS,
    text: text || '',
    nouns: nouns || [],
    header: header || INITIAL_CUE_CARD_PROPS,
    pattern: pattern || INITIAL_PATTERN,
  };
  return cue;
};
