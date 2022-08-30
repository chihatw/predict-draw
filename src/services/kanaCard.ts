import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { KanaCards } from '../Model';
import { db } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTION = 'kanaCards';

export const useKanaCards = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsub = onSnapshot(doc(db, COLLECTION, 'params'), (doc) => {
      console.log('snapshot kanaCards');
      if (!doc.exists()) return;
      const kanaCards = buildKanaCards(doc);
      dispatch({ type: ActionTypes.setKanaCards, payload: kanaCards });
    });

    return () => unsub();
  }, []);
};

export const setKanaCards = (kanaCards: KanaCards) => {
  console.log('set kanaCards');
  setDoc(doc(db, COLLECTION, 'params'), kanaCards);
};

const buildKanaCards = (doc: DocumentData): KanaCards => {
  const { tapped, kanas } = doc.data();
  return {
    tapped: tapped || [],
    kanas: kanas || [],
  };
};
