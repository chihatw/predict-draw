import { ICuePattern } from 'application/cuePattern/core/0-interface';
import { initialState } from 'application/cuePattern/core/1-constants';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import * as _ from 'lodash';
import { ICueWorkoutCue } from '../core/0-interface';

const COLLECTION = 'cueWorkout';
const DOC_ID = 'cue';

export const listenCueWorkoutCue = (
  localCueWorkoutCue: ICueWorkoutCue,
  localCuePattern: ICuePattern,
  cueWorkoutCueCallback: (cueWorkoutCue: ICueWorkoutCue) => void,
  cuePatternCallback: (cuePattern: ICuePattern) => void
) => {
  return onSnapshot(doc(db, COLLECTION, DOC_ID), (docSnapshot) => {
    console.log(`%cfetched ${COLLECTION}`, 'color:red');
    const { cuePattern, cueWorkoutCue } = buildCueWorkoutCue(docSnapshot);
    if (!_.isEqual(localCueWorkoutCue, cueWorkoutCue)) {
      cueWorkoutCueCallback(cueWorkoutCue);
    }
    if (!_.isEqual(localCuePattern, cuePattern)) {
      cuePatternCallback(cuePattern);
    }
  });
};

const buildCueWorkoutCue = (doc: DocumentData) => {
  const { header, nouns, text, verb, pattern } = doc.data();

  const cueWorkoutCue: ICueWorkoutCue = {
    header: header || { label: '', pitchStr: '' },
    nouns: nouns || [],
    text: text || '',
    verb: verb || { label: '', pitchStr: '' },
  };

  const cuePattern: ICuePattern = pattern || initialState;

  return { cueWorkoutCue, cuePattern };
};
