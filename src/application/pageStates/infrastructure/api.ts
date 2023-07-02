import * as _ from 'lodash';

import { Dictionary } from '@reduxjs/toolkit';
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'infrastructure/firebase';

import { IPageState } from '../core/0-interface';

const COLLECTION = 'pageStates';

export const changePageState = async (id: string, state: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  await updateDoc(doc(db, COLLECTION, id), { state });
};

export const listenPageStates = (
  localPageStates: Dictionary<IPageState>,
  callback: (pageStates: IPageState[]) => void
) => {
  const q = query(collection(db, COLLECTION));
  return onSnapshot(q, (querySnapshot) => {
    console.log(`%cfetch ${COLLECTION}`, 'color:red');
    const pageStates: IPageState[] = [];
    querySnapshot.forEach((doc) => {
      pageStates.push(buildPageState(doc));
    });
    if (isEqual(pageStates, localPageStates)) return;
    callback(pageStates);
  });
};

const isEqual = (
  pageStates: IPageState[],
  localPageStates: Dictionary<IPageState>
) => {
  let result = !!Object.keys(localPageStates).length;
  for (const [key, local] of Object.entries(localPageStates)) {
    const remote = pageStates.find((pageState) => pageState.id === key);
    if (!_.isEqual(local, remote)) {
      result = false;
    }
  }
  return result;
};

const buildPageState = (doc: DocumentData) => {
  const { state } = doc.data();
  const pageState: IPageState = {
    id: doc.id,
    state,
  };
  return pageState;
};
