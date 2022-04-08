import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  updateDocumenValue,
  snapshotDocumentValue,
} from '../repositories/utils';

const COLLECTION = 'game';

const RESULT_DOC_ID = 'result';
const PREDICT_DOC_ID = 'predict';
const YES_RATIO_DOC_ID = 'yesRatio';
const NEW_GAME_AT_DOC_ID = 'newGameAt';

const usePredict = () => {
  const [predict, setPredict] = useState('');
  const [yesRatio, setYesRatio] = useState(0);
  const [newGameAt, setNewGameAt] = useState(0);
  const [drawn, setDrawn] = useState<'yes' | 'no' | ''>('');

  const _snapshotDocumentValue = useMemo(
    () =>
      function <T>({
        docId,
        initialValue,
        setValue,
      }: {
        docId: string;
        initialValue: T;
        setValue: (value: T) => void;
      }): Unsubscribe {
        return snapshotDocumentValue({
          db,
          docId,
          colId: COLLECTION,
          initialValue,
          setValue,
        });
      },
    []
  );

  const _updateDocumentValue = useMemo(
    () =>
      function <T>({ value, docId }: { value: T; docId: string }) {
        updateDocumenValue({
          db,
          value,
          colId: COLLECTION,
          docId,
        });
      },
    []
  );

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: PREDICT_DOC_ID,
      initialValue: '',
      setValue: setPredict,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: YES_RATIO_DOC_ID,
      initialValue: 0,
      setValue: setYesRatio,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: NEW_GAME_AT_DOC_ID,
      initialValue: 0,
      setValue: setNewGameAt,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: RESULT_DOC_ID,
      initialValue: '',
      setValue: setDrawn,
    });
    return () => {
      unsub();
    };
  }, []);

  const updatePredict = async (value: string) => {
    _updateDocumentValue({ value, docId: PREDICT_DOC_ID });
  };

  const updateYesRatio = (value: number) => {
    _updateDocumentValue({ value, docId: YES_RATIO_DOC_ID });
  };

  const updateNewGameAt = () => {
    _updateDocumentValue({
      value: { value: Date.now() },
      docId: NEW_GAME_AT_DOC_ID,
    });
  };

  const updateDrawn = async (value: string) => {
    _updateDocumentValue({ value, docId: RESULT_DOC_ID });
  };

  return {
    drawn,
    predict,
    yesRatio,
    newGameAt,
    updateDrawn,
    updatePredict,
    updateYesRatio,
    updateNewGameAt,
  };
};
export default usePredict;
