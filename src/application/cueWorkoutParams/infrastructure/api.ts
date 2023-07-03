import {
  DocumentData,
  doc,
  increment,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import * as _ from 'lodash';

import { ICuePatternParams } from 'application/cuePatternParams/core/0-interface';
import { ICueWorkoutParams } from '../core/0-interface';
import { INITIAL_LAST_PATTERNS } from '../core/1-constants';

const COLLECTION = 'cueWorkout';
const DOC_ID = 'params';

export const listenCueWorkoutParams = (
  localCueWorkoutParams: ICueWorkoutParams,
  localCuePatternParams: ICuePatternParams,
  cueWorkoutParamsCallback: (value: ICueWorkoutParams) => void,
  cuePatternParamsCallback: (value: ICuePatternParams) => void
) => {
  return onSnapshot(doc(db, COLLECTION, DOC_ID), (docSnapshot) => {
    console.log(`%cfetched ${COLLECTION}`, 'color:red');
    const { cueWorkoutParams, cuePatternParams } =
      buildCueWorkoutParams(docSnapshot);
    if (!_.isEqual(localCueWorkoutParams, cueWorkoutParams)) {
      cueWorkoutParamsCallback(cueWorkoutParams);
    }
    if (!_.isEqual(localCuePatternParams, cuePatternParams)) {
      cuePatternParamsCallback(cuePatternParams);
    }
  });
};

export const reset = async () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    isRunning: false,
    points: 0,
  });
};

export const start = () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    isRunning: true,
  });
};

export const next = () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    points: increment(1),
  });
};

export const stop = () => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    isRunning: false,
  });
};

export const setColors = (colors: string[]) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    colors,
  });
};

export const setTime = (time: number) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    time,
  });
};

export const updatePatternParams = (patternParams: ICuePatternParams) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), {
    patternParams,
  });
};

const buildCueWorkoutParams = (doc: DocumentData) => {
  const { colors, isRunning, lastPattern, patternParams, points, time } =
    doc.data();

  const cueWorkoutParams: ICueWorkoutParams = {
    colors: colors || [],
    isRunning: isRunning || false,
    lastPattern: lastPattern || INITIAL_LAST_PATTERNS,
    points: points || 0,
    time: time || 0,
  };
  const cuePatternParams: ICuePatternParams = { ...patternParams };

  return { cueWorkoutParams, cuePatternParams };
};
