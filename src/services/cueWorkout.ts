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
  const { nouns, isInverse, verb } = doc.data();
  const cue: CueWorkoutCue = {
    nouns: nouns || [],
    isInverse: isInverse || false,
    verb: verb || '',
  };
  return cue;
};

const buildParams = (doc: DocumentData) => {
  const { colors, isRandom, isRunning, points, time, verbs, isInverse, hands } =
    doc.data();
  const params: CueWorkoutParams = {
    time: time || 0,
    verbs: verbs || [],
    hands: hands || [],
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
  if (!params.colors.length || !params.verbs.length)
    return INITIAL_CUE_WORKOUT_CUE;

  // hands 要素があるとき 50% で true
  let hasHands = !!params.hands.length && !!getRandomInt(2);

  let verb = '';
  let nouns: string[] = [];
  let isInverse = false; // 「をに」が逆順

  const verbIndex = getRandomInt(params.verbs.length);
  verb = params.verbs[verbIndex];

  // motsu, kabuseru は「手」を使わない
  if (['motsu', 'kabuseru'].includes(verb)) {
    hasHands = false;
  }

  // isInverse
  switch (verb) {
    case 'motsu':
    case 'yubisasu':
    case 'hikkurikaesu':
      break;
    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      if (params.isRandom) {
        isInverse = !!getRandomInt(2);
      } else if (params.isInverse) {
        isInverse = true;
      }
      break;
    default:
  }

  // nouns
  // 手を使用
  if (hasHands) {
    switch (verb) {
      case 'yubisasu':
      case 'hikkurikaesu':
        // 「《読み手の手》を〜」構文を作成
        // 「《聞き手の手》を〜」は作らない
        if (params.hands.includes('mine')) {
          nouns.push('mine');
          break;
        }
        nouns.push(shuffle(params.colors)[0]);
        break;
      case 'ireru':
        // 「《手》を《コップ》に入れる」構文を作成 読み手・聞き手どちらもOK
        // 「〜を」の名詞に、手を追加
        nouns.push(shuffle(params.hands)[0]);
        // 「〜に」の名詞に、色を追加
        nouns.push(shuffle(params.colors)[0]);
        break;

      case 'noseru':
        const isHandOn = !!getRandomInt(2);
        if (isHandOn) {
          // 「《手》を《コップ》に乗せる」構文
          // 「〜を」の名詞に、手を追加
          nouns.push(shuffle(params.hands)[0]);
          // 「〜に」の名詞に、色を追加
          nouns.push(shuffle(params.colors)[0]);
          break;
        }
        // 「《コップ》を《手》に乗せる」構文を作成
        // 「〜を」の名詞に、色を追加
        nouns.push(shuffle(params.colors)[0]);
        // 「〜に」の名詞に、手を追加
        nouns.push(shuffle(params.hands)[0]);
        break;
      case 'motsu':
      case 'kabuseru':
        console.warn('incorrect!!');
        break;
      default:
    }
  }
  // コップのみ使用
  else {
    switch (verb) {
      case 'motsu':
      case 'yubisasu':
      case 'hikkurikaesu':
        nouns.push(shuffle(params.colors)[0]);
        break;
      case 'ireru':
      case 'noseru':
      case 'kabuseru':
        nouns = shuffle(params.colors).slice(0, 2);
        break;
      default:
    }
  }

  const cue: CueWorkoutCue = {
    nouns,
    verb,
    isInverse,
  };
  return cue;
};

/**
 * /UserPane/CueWorkoutPane/index.tsx で
 * 新規キューが、現キューと同値ならば、新規キューを作り直す処理で使用
 */
export const getCueString = (cue: CueWorkoutCue): string => {
  // const { nouns, verb, isInverse } = cue;
  console.log(cue);
  switch (cue.verb) {
    case 'motsu':
    case 'yubisasu':
    case 'hikkurikaesu':
      return cue.nouns[0] + 'wo' + cue.verb;

    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      if (cue.isInverse) {
        return cue.nouns[0] + 'ni' + cue.nouns[1] + 'wo' + cue.verb;
      }
      return cue.nouns[0] + 'wo' + cue.nouns[1] + 'ni' + cue.verb;
  }
  return '';
};
