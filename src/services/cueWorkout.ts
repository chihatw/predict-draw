import {
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import {
  CueWorkoutCue,
  CueWorkoutParams,
  INITIAL_CUE_WORKOUT_CUE,
} from '../Model';
import { CUE_CARDS } from '../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { getRandomInt, shuffle } from './utils';

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
  const { colors, isInverse, verb } = doc.data();
  const cue: CueWorkoutCue = {
    colors: colors || [],
    isInverse: isInverse || false,
    verb: verb || '',
  };
  return cue;
};

const buildParams = (doc: DocumentData) => {
  const { colors, isRandom, isRunning, points, time, verbs, isInverse } =
    doc.data();
  const params: CueWorkoutParams = {
    time: time || 0,
    verbs: verbs || [],
    points: points || 0,
    colors: colors || [],
    isRandom: isRandom || false,
    isRunning: isRunning || false,
    isInverse: isInverse || false,
  };
  return params;
};

export const createCueFromParams = (
  params: CueWorkoutParams
): CueWorkoutCue => {
  const { colors, verbs, isRandom, isInverse: paramIsInverse } = params;

  if (!colors.length || !verbs.length) return INITIAL_CUE_WORKOUT_CUE;

  let verb = '';
  let cueColors: string[] = shuffle(colors);
  let isInverse = false;

  const verbIndex = getRandomInt(verbs.length);
  verb = verbs[verbIndex];

  switch (verb) {
    case 'motsu':
    case 'yubisasu':
    case 'hikkurikaesu':
      cueColors = cueColors.slice(0, 1);
      break;
    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      cueColors = cueColors.slice(0, 2);
      if (isRandom) {
        const _isInverse = getRandomInt(2);
        isInverse = !!_isInverse;
      } else if (paramIsInverse) {
        isInverse = true;
      }

      break;
    default:
  }

  const cue: CueWorkoutCue = {
    colors: cueColors,
    verb,
    isInverse,
  };
  return cue;
};

export const getCueString = (cue: CueWorkoutCue): string => {
  const { colors, verb, isInverse } = cue;
  switch (verb) {
    case 'motsu':
    case 'yubisasu':
    case 'hikkurikaesu':
      return colors[0] + 'wo' + verb;

    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      if (isInverse) {
        return colors[0] + 'ni' + colors[1] + 'wo' + verb;
      }
      return colors[0] + 'wo' + colors[1] + 'ni' + verb;
  }
  return '';
};
