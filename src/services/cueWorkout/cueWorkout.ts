import { initialState } from 'application/cuePatternParams/core/1-constants';
import {
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../infrastructure/firebase';
import {
  CueWorkoutCue,
  CueWorkoutParams,
  INITIAL_CUE_CARD_PROPS,
  INITIAL_PATTERN,
} from '../../Model';
import { Action, ActionTypes } from '../../Update';
import { CUE_CARDS } from '../../views/components/CueWorkoutPane/CUE_CARDS';

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

    const unsubParams = onSnapshot(
      doc(db, COLLECTIONS.cueWorkout, 'params'),
      (doc) => {
        console.log('snapShot cueWorkoutParams');
        if (!doc.exists()) return;
        const params = buildParams(doc);
        dispatch({ type: ActionTypes.setCueWorkoutParams, payload: params });
      }
    );
    return () => {
      unsubCue();
      unsubParams();
    };
  }, []);
};

export const setCueWorkoutParams = async (params: CueWorkoutParams) => {
  console.log('set cueWorkoutParams');
  await setDoc(doc(db, COLLECTIONS.cueWorkout, 'params'), params);
};

export const stopCueWorkout = async () => {
  console.log('update cueWorkoutParams');
  await updateDoc(doc(db, COLLECTIONS.cueWorkout, 'params'), {
    isRunning: false,
  });
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

const buildParams = (doc: DocumentData) => {
  const { time, colors, points, isRunning, patternParams, lastPattern } =
    doc.data();
  const params: CueWorkoutParams = {
    time: time || 0,
    points: points || 0,
    colors: colors || [],
    isRunning: isRunning || false,
    patternParams: patternParams || initialState,
    lastPattern: lastPattern || INITIAL_PATTERN,
  };
  return params;
};
