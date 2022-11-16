import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { PitchListState, RhythmListState } from '../Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTION = 'pitchList';

export const usePitchList = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsub = onSnapshot(doc(db, COLLECTION, 'params'), (doc) => {
      console.log('snapshot pitchList');
      if (!doc.exists()) return;
      const pitchList = buildPitchList(doc);
      dispatch({ type: ActionTypes.setPitchList, payload: pitchList });
    });
    return () => unsub();
  }, []);
};

export const setPitchList = (pitchList: PitchListState) => {
  console.log('set pitchList');
  setDoc(doc(db, COLLECTION, 'params'), pitchList);
};

const buildPitchList = (doc: DocumentData): PitchListState => {
  const { tapped, mora } = doc.data();
  return {
    tapped: tapped || [],
    mora: mora || 2,
  };
};
