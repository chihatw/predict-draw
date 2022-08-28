import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { RhythmListState } from '../Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTION = 'rhythmList';

export const useRhythmList = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsub = onSnapshot(doc(db, COLLECTION, 'params'), (doc) => {
      console.log('snapshot rhyhhmList');
      if (!doc.exists()) return;
      const rhythmList = buildRhythmList(doc);
      dispatch({ type: ActionTypes.setRhythmList, payload: rhythmList });
    });
    return () => unsub();
  }, []);
};

export const setRhythmList = (rhythmList: RhythmListState) => {
  console.log('set rhythmList');
  setDoc(doc(db, COLLECTION, 'params'), rhythmList);
};

const buildRhythmList = (doc: DocumentData): RhythmListState => {
  const { tapped, mora } = doc.data();
  return {
    tapped: tapped || [],
    mora: mora || 0,
  };
};
