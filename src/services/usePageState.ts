import { Unsubscribe, DocumentData } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import { PageState } from './context';
import { setDocument, snapshotDocument } from '../repositories/utils';

const COLLECTION = 'pageStates';
const LI_SAN_PROP = 'liSan';
const KOU_SAN_PROP = 'kouSan';

const buildState = (doc: DocumentData) => {
  let state: PageState = doc.data().state;
  return state;
};

const usePageState = () => {
  const [liSanPageState, setLiSanPageState] = useState<PageState>('');
  const [kouSanPageState, setKouSanPageState] = useState<PageState>('');

  const _snapshotDocument = useMemo(
    () =>
      function <T>({
        id,
        initialValue,
        setValue,
        buildValue,
      }: {
        id: string;
        initialValue: T;
        setValue: (value: T) => void;
        buildValue: (value: DocumentData) => T;
      }): Unsubscribe {
        return snapshotDocument({
          db,
          id,
          colId: COLLECTION,
          initialValue,
          setValue,
          buildValue,
        });
      },
    []
  );

  const _setDocument = useMemo(
    () =>
      function <T extends { id: string }>(value: T) {
        setDocument({
          db,
          value,
          colId: COLLECTION,
        });
      },
    []
  );

  // 李さんの状態監視
  useEffect(() => {
    const unsub = _snapshotDocument({
      id: LI_SAN_PROP,
      initialValue: '',
      setValue: setLiSanPageState,
      buildValue: buildState,
    });
    return () => {
      unsub();
    };
  }, []);

  // 黄さんの状態監視
  useEffect(() => {
    const unsub = _snapshotDocument({
      id: KOU_SAN_PROP,
      initialValue: '',
      setValue: setKouSanPageState,
      buildValue: buildState,
    });
    return () => {
      unsub();
    };
  }, []);

  const updateLiSanPageState = (state: PageState) => {
    _setDocument({ id: LI_SAN_PROP, state });
  };

  const updateKouSanPageState = (state: PageState) => {
    _setDocument({ id: KOU_SAN_PROP, state });
  };

  return {
    liSanPageState,
    kouSanPageState,
    updateLiSanPageState,
    updateKouSanPageState,
  };
};
export default usePageState;
