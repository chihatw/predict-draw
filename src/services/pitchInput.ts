import * as R from 'ramda';
import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { PitchInput, PitchInputLogs } from '../Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTION = 'pitchInput';

export const usePitchInput = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsub = onSnapshot(doc(db, COLLECTION, 'params'), (doc) => {
      console.log('snapshot pitchInput');
      if (!doc.exists()) return;
      const pitchInput = buildPitchInput(doc);
      dispatch({
        type: ActionTypes.setPitchInput,
        payload: pitchInput,
      });
    });
    const unsubLog = onSnapshot(doc(db, COLLECTION, 'logs'), (doc) => {
      console.log('snapshot pitchInput logs');
      if (!doc.exists()) return;
      const pitchInputLogs = buildPitchInputLogs(doc);
      dispatch({
        type: ActionTypes.setPitchInputLogs,
        payload: pitchInputLogs,
      });
    });
    return () => {
      unsub();
      unsubLog();
    };
  }, []);
};

export const setPitchInput = async (pitchInput: PitchInput) => {
  console.log('set pitchInput');
  setDoc(doc(db, COLLECTION, 'params'), pitchInput);
};
export const setPitchInputLogs = async (pitchInputLogs: PitchInputLogs) => {
  console.log('set pitchInputLogs');
  setDoc(doc(db, COLLECTION, 'logs'), pitchInputLogs);
};

export const updateRemoteLog = (
  input: string,
  currentIndex: number,
  pitchInputLogs: PitchInputLogs
) => {
  const updatedPitchInputLogs = R.assocPath<string, PitchInputLogs>(
    [currentIndex],
    input
  )(pitchInputLogs);
  setPitchInputLogs(updatedPitchInputLogs);
};

const buildPitchInput = (doc: DocumentData): PitchInput => {
  const { mora, cueIds, hasA, hasN, hasX, normalOnly } = doc.data();
  return {
    mora: mora || 2,
    cueIds: cueIds || [],
    hasA: hasA ?? true,
    hasN: hasN ?? true,
    hasX: hasX ?? true,
    normalOnly: normalOnly ?? true,
  };
};

const buildPitchInputLogs = (doc: DocumentData): PitchInputLogs => {
  return doc.data() || {};
};
