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
  INITIAL_CUE_WORKOUT_CUE,
  JOSHI_ORDER,
  NEGATIVE_SENTENCE,
} from '../Model';
import { CUE_CARDS } from '../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { getRandomInt, shuffle } from './utils';

const POSITIONS = ['right', 'left'];

const VERB_WEIGHT: { [key: string]: number } = {
  motsu: 2,
  yubisasu: 1,
  hikkurikaesu: 1,
  ireru: 4,
  noseru: 4,
  kabuseru: 4,
};

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
  const { nouns, isInverse, verb, hasTopic, isNegative } = doc.data();
  const cue: CueWorkoutCue = {
    verb: verb || '',
    nouns: nouns || [],
    hasTopic: hasTopic || false,
    isInverse: isInverse || false,
    isNegative: isNegative || false,
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
    negativeSentence: negativeSentence || NEGATIVE_SENTENCE.never,
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
  const hasTopic = (() => {
    switch (params.topicMode) {
      case TOPIC_MODE.hasTopic:
        return true;
      case TOPIC_MODE.random:
        // ランダムの時は、50% で true
        return !!getRandomInt(2);
      default:
        return false;
    }
  })();
  const isNegative = (() => {
    switch (params.negativeSentence) {
      case NEGATIVE_SENTENCE.always:
        return true;
      case NEGATIVE_SENTENCE.random:
        return !!getRandomInt(2);
      default:
        return false;
    }
  })();

  let isInverse = false; // 「をに」が逆順

  const weightedVerbArray = getWeightedVerbArray(params.verbs);
  const verbIndex = getRandomInt(weightedVerbArray.length);
  verb = weightedVerbArray[verbIndex];

  // motsu, kabuseru の時は「手」を使わない
  if (['motsu', 'kabuseru'].includes(verb)) {
    hasHands = false;
  }

  // isInverse　助詞の順番入れ替えをするかどうか設定
  switch (verb) {
    // 複数目的語の動詞の場合（単独目的語は無関係）
    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      switch (params.joshiOrder) {
        case JOSHI_ORDER.random:
          isInverse = !!getRandomInt(2);
          break;
        case JOSHI_ORDER.inverse:
          isInverse = true;
          break;
        default:
      }
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
        const shuffledColors = shuffle(params.colors);
        const shuffledPositions = shuffle(POSITIONS);

        if (!!params.hasPosition) {
          // 33% で 第1項目に位置詞を入れる
          let rand = Math.floor(Math.random() * 100);
          if (rand < 33) {
            shuffledColors[0] = shuffledPositions[0];
          }

          // 33% で 第2項目に位置詞を入れる
          rand = Math.floor(Math.random() * 100);
          if (rand < 33) {
            shuffledColors[1] = shuffledPositions[1];
          }
        }

        nouns = shuffledColors.slice(0, 2);
        break;
      default:
    }
  }

  const cue: CueWorkoutCue = {
    nouns,
    verb,
    hasTopic,
    isInverse,
    isNegative,
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

const getWeightedVerbArray = (verbs: string[]) => {
  let weightedVerbArray = [];
  for (const verb of verbs) {
    for (let i = 0; i < VERB_WEIGHT[verb]; i++) {
      weightedVerbArray.push(verb);
    }
  }
  return shuffle(weightedVerbArray);
};
