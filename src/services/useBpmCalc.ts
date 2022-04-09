import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  updateDocumenValue,
  snapshotDocumentValue,
} from '../repositories/utils';

export type BpmCalcLabel = { label: string; syllableCount: number };

const COLLECTION = 'bpmCalc';
const BPM_DOC_ID = 'bpm';
const LABEL_DOC_ID = 'label';
const IS_RUNNING_DOC_ID = 'isRunning';
const BEAT_COUNT_DOC_ID = 'beatCount';

export const useBpmCalc = () => {
  const [bpm, setBpm] = useState(0);
  const [label, setLabel] = useState('');
  const [beatCount, setBeatCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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

  useEffect(() => {
    const usesub = _snapshotDocumentValue({
      docId: BEAT_COUNT_DOC_ID,
      initialValue: 0,
      setValue: setBeatCount,
    });
    return () => {
      usesub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: LABEL_DOC_ID,
      initialValue: '',
      setValue: setLabel,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: IS_RUNNING_DOC_ID,
      initialValue: false,
      setValue: setIsRunning,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: BPM_DOC_ID,
      initialValue: 0,
      setValue: setBpm,
    });
    return () => {
      unsub();
    };
  }, []);

  return {
    bpm,
    label,
    beatCount,
    isRunning,
  };
};

export const useHandleBpmCalc = () => {
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

  const updateBpm = (value: number) =>
    _updateDocumentValue({ value, docId: BPM_DOC_ID });

  const updateLabel = (value: string) =>
    _updateDocumentValue({ value, docId: LABEL_DOC_ID });

  const updateIsRunning = (value: boolean) => {
    _updateDocumentValue({ value, docId: IS_RUNNING_DOC_ID });
  };

  const updateBeatCount = (value: number) =>
    _updateDocumentValue({ value, docId: BEAT_COUNT_DOC_ID });

  const startTimer = () => {
    updateBpm(0);
    updateIsRunning(true);
  };
  const stopTimer = (bpm: number) => {
    updateBpm(bpm);
    updateIsRunning(false);
  };
  return {
    stopTimer,
    updateBpm,
    startTimer,
    updateLabel,
    updateIsRunning,
    updateBeatCount,
  };
};
