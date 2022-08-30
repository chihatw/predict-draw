import downpitch_120 from '../assets/audios/downpitch_120.mp3';
import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { RhythmListening, State } from '../Model';
import { RhythmListeningFormState } from '../pages/User/UserPane/RhythmListeningPane/Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { shuffle } from './utils';

const COLLECTION = 'rhythmListening';

export const useRhythmListening = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubParams = onSnapshot(doc(db, COLLECTION, 'params'), (doc) => {
      console.log('snapshot rhythmListening');
      if (!doc.exists()) return;
      const rhythmListening = buildRhythmListening(doc);
      dispatch({
        type: ActionTypes.setRhythmListening,
        payload: rhythmListening,
      });
    });
    const unsubAnswers = onSnapshot(doc(db, COLLECTION, 'monitor'), (doc) => {
      console.log('snapshot rhythmListeningAnswers');
      if (!doc.exists()) return;
      const answers = buildRhythmListeningAnswers(doc);
      dispatch({
        type: ActionTypes.setRhythmListeningAnswers,
        payload: answers,
      });
    });
    return () => {
      unsubParams();
      unsubAnswers();
    };
  }, []);
};

export const setRhythmListening = async (rhythmListening: RhythmListening) => {
  console.log('set rhythmListening');
  setDoc(doc(db, COLLECTION, 'params'), rhythmListening);
};

export const setRhythmListeningAnswers = async (answers: {
  [index: number]: string[];
}) => {
  console.log('set rhythmListeningAnswers');
  setDoc(doc(db, COLLECTION, 'monitor'), { answers });
};

export const buildCueIds = (mora: number, cueCount: number): string[] => {
  let cueIds: string[] = [];

  switch (mora) {
    case 2:
      cueIds = ['tatta', 'tatax', 'taata', 'tataa', 'tanta', 'tatan', 'tatata'];
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

export const buildFormState = (state: State): RhythmListeningFormState => {
  return {
    blob: state.blobs[downpitch_120],
    mora: state.rhythmListening.mora,
    cueIds: state.rhythmListening.cueIds,
    answerIds: [],
    currentIndex: 0,
    audioContext: state.audioContext,
  };
};

const buildRhythmListening = (doc: DocumentData): RhythmListening => {
  const { mora, cueIds, cueCount } = doc.data();
  return {
    mora: mora || 1,
    cueIds: cueIds || [],
    cueCount: cueCount || 0,
  };
};

const buildRhythmListeningAnswers = (
  doc: DocumentData
): { [index: number]: string[] } => {
  const { answers } = doc.data();
  return answers || {};
};
