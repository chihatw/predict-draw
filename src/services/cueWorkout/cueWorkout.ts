import {
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import {
  TOPIC_MODE,
  CueWorkoutCue,
  CueWorkoutParams,
  JOSHI_ORDER,
  NEGATIVE_SENTENCE,
  INITIAL_CUE_CARD_PROPS,
} from '../../Model';
import { CUE_CARDS } from '../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';
import { db } from '../../repositories/firebase';
import { Action, ActionTypes } from '../../Update';

const COLLECTIONS = {
  cueWorkout: 'cueWorkout',
};

export const useCueWorkout = (dispatch: React.Dispatch<Action>) => {
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
  const { nouns, verb, text } = doc.data();
  const cue: CueWorkoutCue = {
    verb: verb || INITIAL_CUE_CARD_PROPS,
    nouns: nouns || [],
    text: text || '',
  };
  return cue;
};

const buildParams = (doc: DocumentData) => {
  const {
    time,
    verbs,
    hands,
    colors,
    points,
    topicMode,
    isRunning,
    joshiOrder,
    hasPosition,
    isPoliteType,
    negativeSentence,
  } = doc.data();
  const params: CueWorkoutParams = {
    time: time || 0,
    verbs: verbs || [],
    hands: hands || [],
    points: points || 0,
    colors: colors || [],
    topicMode: topicMode || TOPIC_MODE.noTopic,
    isRunning: isRunning || false,
    joshiOrder: joshiOrder || JOSHI_ORDER.default,
    hasPosition: hasPosition || false,
    isPoliteType: isPoliteType || false,
    negativeSentence: negativeSentence || NEGATIVE_SENTENCE.never,
  };
  return params;
};
