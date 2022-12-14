import gojuuon from '../assets/audios/gojuuon.mp3';
import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { KanaCards, KanaWorkoutParams, State } from '../Model';
import { KanaWorkoutState } from '../pages/User/UserPane/KanaWorkoutPane/Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { shuffle } from './utils';
import { KANAS } from '../kana';

const COLLECTIONS = {
  params: 'params',
  kanaCards: 'kanaCards',
};

export const useKanaCards = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubKanaCards = onSnapshot(
      doc(db, COLLECTIONS.kanaCards, 'params'),
      (doc) => {
        console.log('snapshot kanaCards');
        if (!doc.exists()) return;
        const kanaCards = buildKanaCards(doc);
        dispatch({ type: ActionTypes.setKanaCards, payload: kanaCards });
      }
    );
    const unsubParams = onSnapshot(
      doc(db, COLLECTIONS.params, 'kanaWorkout'),
      (doc) => {
        console.log('snapshot kanaWorkoutParams');
        if (!doc.exists()) return;
        const kanaWorkoutParams = buildKanaWorkoutParams(doc);
        dispatch({
          type: ActionTypes.setKanaWorkoutParams,
          payload: kanaWorkoutParams,
        });
      }
    );

    return () => {
      unsubParams();
      unsubKanaCards();
    };
  }, []);
};

export const setKanaCards = (kanaCards: KanaCards) => {
  console.log('set kanaCards');
  setDoc(doc(db, COLLECTIONS.kanaCards, 'params'), kanaCards);
};

export const setKanaWorkoutParams = (kanaWorkoutParams: KanaWorkoutParams) => {
  console.log('set kanaWorkoutParams');
  setDoc(doc(db, COLLECTIONS.params, 'kanaWorkout'), kanaWorkoutParams);
};

export const buildKanaWorkoutState = (state: State): KanaWorkoutState => {
  const kanas = state.kanaCards.kanas;

  const cueIds = shuffle(kanas).filter((kana) =>
    Object.values(KANAS).find((item) => [item.hira, item.kata].includes(kana))
  );

  return {
    audioBuffer: state.audioBuffers[gojuuon],
    kanas,
    cueIds,
    answers: [],
    currentIndex: 0,
    audioContext: state.audioContext,
  };
};

const buildKanaCards = (doc: DocumentData): KanaCards => {
  const { tapped, kanas } = doc.data();
  return {
    tapped: tapped || [],
    kanas: kanas || [],
  };
};

const buildKanaWorkoutParams = (doc: DocumentData): KanaWorkoutParams => {
  const { kanas, answers, currentIndex } = doc.data();
  return {
    kanas: kanas || [],
    answers: answers || {},
    currentIndex: currentIndex || 0,
  };
};
