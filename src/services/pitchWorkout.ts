import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { PitchWorkout } from '../Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

import { PITCH_WORKOUT_ITEMS } from '../pitchWorkoutItems';
import { shuffle } from './utils';

const COLLECTION = 'pitchWorkout';

export const usePitchWorkout = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubParams = onSnapshot(doc(db, COLLECTION, 'params'), (doc) => {
      console.log('snapshot pitchWorkout');
      if (!doc.exists()) return;
      const pitchWorkout = buildPitchWorkout(doc);
      dispatch({
        type: ActionTypes.setPitchWorkout,
        payload: pitchWorkout,
      });
    });
    const unsubAnswers = onSnapshot(doc(db, COLLECTION, 'monitor'), (doc) => {
      console.log('snapshot pitchWorkoutAnswers');
      if (!doc.exists()) return;
      const answers = buildPitchWorkoutAnswers(doc);
      dispatch({
        type: ActionTypes.setPitchWorkoutAnswers,
        payload: answers,
      });
    });
    return () => {
      unsubParams();
      unsubAnswers();
    };
  }, []);
};

export const setPitchWorkout = async (pitchWorkout: PitchWorkout) => {
  console.log('set pitchWorkout');
  setDoc(doc(db, COLLECTION, 'params'), pitchWorkout);
};

export const setPitchWorkoutAnswers = async (answers: {
  [index: number]: string[];
}) => {
  console.log('set pitchWorkoutAnswers');
  setDoc(doc(db, COLLECTION, 'monitor'), { answers });
};

export const buildPitchWorkoutCueIds = (mora: number): string[] => {
  const cueIds = Object.values(PITCH_WORKOUT_ITEMS)
    .filter((item) => item.id.length === mora)
    .map(({ id }) => id);
  return shuffle(cueIds);
};

const buildPitchWorkout = (doc: DocumentData): PitchWorkout => {
  const { mora, cueIds } = doc.data();
  return {
    mora: mora || 2,
    cueIds: cueIds || [],
  };
};

const buildPitchWorkoutAnswers = (
  doc: DocumentData
): { [index: number]: string[] } => {
  const { answers } = doc.data();
  return answers || {};
};
