import downpitch_120 from '../assets/audios/downpitch_120.mp3';
import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { RhythmWorkout, State } from '../Model';
import { RhythmLWorkoutFormState } from '../pages/User/UserPane/RhythmWorkoutPane/Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { shuffle } from './utils';

const COLLECTIONS = {
  rhythmWorkout: 'rhythmWorkout',
};

export const useRhythmWorkout = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubParams = onSnapshot(
      doc(db, COLLECTIONS.rhythmWorkout, 'params'),
      (doc) => {
        console.log('snapshot rhythmWorkout');
        if (!doc.exists()) return;
        const rhythmWorkout = buildRhythmWorkout(doc);
        dispatch({
          type: ActionTypes.setRhythmWorkout,
          payload: rhythmWorkout,
        });
      }
    );
    const unsubAnswers = onSnapshot(
      doc(db, COLLECTIONS.rhythmWorkout, 'monitor'),
      (doc) => {
        console.log('snapshot rhythmWorkoutAnswers');
        if (!doc.exists()) return;
        const answers = buildRhythmWorkoutAnswers(doc);
        dispatch({
          type: ActionTypes.setRhythmWorkoutAnswers,
          payload: answers,
        });
      }
    );
    return () => {
      unsubParams();
      unsubAnswers();
    };
  }, []);
};

export const setRhythmWorkout = async (rhythmWorkout: RhythmWorkout) => {
  console.log('set rhythmWorkout');
  setDoc(doc(db, COLLECTIONS.rhythmWorkout, 'params'), rhythmWorkout);
};

export const setRhythmWorkoutAnswers = async (answers: {
  [index: number]: string[];
}) => {
  console.log('set rhythmWorkoutAnswers');
  setDoc(doc(db, COLLECTIONS.rhythmWorkout, 'monitor'), { answers });
};

export const buildCueIds = (mora: number, cueCount: number): string[] => {
  let cueIds: string[] = [];

  switch (mora) {
    // OPTIMIZE 2拍制限中
    case 2:
      cueIds = ['tatta', 'taata', 'tanta', 'tatata'];
      // cueIds = ['tatta', 'tatax', 'taata', 'tataa', 'tanta', 'tatan', 'tatata'];
      break;
    case 3:
      cueIds = [
        'tattata',
        'tatatta',
        'tatatax',
        'tattaa',
        'tattan',
        'taatata',
        'tataata',
        'tatataa',
        'taataa',
        'taatan',
        'tantata',
        'tatanta',
        'tatatan',
        'tantaa',
        'tantan',
        'tatatata',
      ];
      break;
    default:
      cueIds = ['ta', 'taa', 'tan', 'tata'];
  }
  cueIds = shuffle(cueIds);
  return cueIds.slice(0, cueCount);
};

export const buildFormState = (state: State): RhythmLWorkoutFormState => {
  return {
    blob: state.blobs[downpitch_120],
    mora: state.rhythmWorkout.mora,
    cueIds: state.rhythmWorkout.cueIds,
    answerIds: [],
    currentIndex: 0,
    audioContext: state.audioContext,
  };
};

const buildRhythmWorkout = (doc: DocumentData): RhythmWorkout => {
  const { mora, cueIds, cueCount } = doc.data();
  return {
    mora: mora || 1,
    cueIds: cueIds || [],
    cueCount: cueCount || 0,
  };
};

const buildRhythmWorkoutAnswers = (
  doc: DocumentData
): { [index: number]: string[] } => {
  const { answers } = doc.data();
  return answers || {};
};
