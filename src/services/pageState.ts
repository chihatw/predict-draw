import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { PageState } from '../Model';

import { PAGES } from 'application/pageStates/core/1-constants';
import { db } from '../infrastructure/firebase';
import { Action, ActionTypes } from '../Update';

const COLLECTIONS = {
  pageStates: 'pageStates',
};

const usePageState = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubLiSanPageState = onSnapshot(
      doc(db, COLLECTIONS.pageStates, 'liSan'),
      (doc) => {
        console.log('snapshot liSanPageState');
        if (!doc.exists() || !dispatch) return;
        const pageState = buildState(doc);
        dispatch({
          type: ActionTypes.setPageState,
          payload: { user: 'liSan', pageState },
        });
      },
      (err) => {
        console.log(err);
      }
    );
    const unsubKouSanPageState = onSnapshot(
      doc(db, COLLECTIONS.pageStates, 'kouSan'),
      (doc) => {
        console.log('snapshot kouSanPageState');
        if (!doc.exists()) return;
        const pageState = buildState(doc);
        dispatch({
          type: ActionTypes.setPageState,
          payload: { user: 'kouSan', pageState },
        });
      },
      (err) => {
        console.log(err);
      }
    );
    const unsubChinSanPageState = onSnapshot(
      doc(db, COLLECTIONS.pageStates, 'chinSan'),
      (doc) => {
        console.log('snapshot chinSanPageState');
        if (!doc.exists()) return;
        const pageState = buildState(doc);
        dispatch({
          type: ActionTypes.setPageState,
          payload: { user: 'chinSan', pageState },
        });
      }
    );
    return () => {
      unsubLiSanPageState();
      unsubKouSanPageState();
      unsubChinSanPageState();
    };
  }, []);
};
export default usePageState;

export const setPageState = (pageState: PageState) => {
  const { id, ...omitted } = pageState;
  console.log('set pageState');
  setDoc(doc(db, COLLECTIONS.pageStates, id), { ...omitted });
};

const buildState = (doc: DocumentData) => {
  const { state } = doc.data();
  return state || PAGES.blank;
};
