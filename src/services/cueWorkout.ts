import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import {
  CueWorkoutCard,
  CueWorkoutCue,
  CueWorkoutParams,
  State,
} from '../Model';
import { CUE_CARDS } from '../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';
import { db, storage } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

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
    const fetchData = async () => {
      const blobURLs: { [imagePath: string]: string } = {};
      await Promise.all(
        Object.values(CUE_CARDS).map(async (cueCard) => {
          const { imagePath } = cueCard;
          console.log('get imageBlob');
          const downloadURL = await getDownloadURL(ref(storage, imagePath));
          const response = await fetch(downloadURL);
          const blob = await response.blob();
          const blobURL = window.URL.createObjectURL(blob);
          blobURLs[imagePath] = blobURL;
        })
      );
      dispatch({ type: ActionTypes.setBlobURLs, payload: blobURLs });
    };
    fetchData();
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

const buildCue = (doc: DocumentData) => {
  const { colors, hasNi, hasWo, isInverse, verb } = doc.data();
  const cue: CueWorkoutCue = {
    colors: colors || [],
    hasNi: hasNi || false,
    hasWo: hasWo || false,
    isInverse: isInverse || false,
    verb: verb || '',
  };
  return cue;
};

const buildParams = (doc: DocumentData) => {
  const { colors, isRandom, isRunning, points, time, verbs } = doc.data();
  const params: CueWorkoutParams = {
    colors: colors || [],
    isRandom: isRandom || false,
    isRunning: isRunning || false,
    points: points || 0,
    time: time || 0,
    verbs: verbs || [],
  };
  return params;
};
