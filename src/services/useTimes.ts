import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  updateDocumenValue,
  snapshotDocumentValue,
} from '../repositories/utils';

const COLLECTION = 'times';

const SCORE_DOC_ID = 'score';
const HOURS_DOC_ID = 'hours';
const MINUTES_DOC_ID = 'minutes';
const INPUT_TIME_DOC_ID = 'inputTime';

export const useTimes = () => {
  const [score, setScore] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [inputTime, setInputTime] = useState(0);

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
    const unsub = _snapshotDocumentValue({
      docId: SCORE_DOC_ID,
      initialValue: 0,
      setValue: setScore,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: HOURS_DOC_ID,
      initialValue: 0,
      setValue: setHours,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: MINUTES_DOC_ID,
      initialValue: 0,
      setValue: setMinutes,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: INPUT_TIME_DOC_ID,
      initialValue: 0,
      setValue: setInputTime,
    });
    return () => {
      unsub();
    };
  }, []);

  return { inputTime, score, hours, minutes };
};

export const useHandleTimes = () => {
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

  const updateHours = (value: number) =>
    _updateDocumentValue({ value, docId: HOURS_DOC_ID });

  const updateMinute = (value: number) =>
    _updateDocumentValue({ value, docId: MINUTES_DOC_ID });

  const updateScore = (value: number) =>
    _updateDocumentValue({ value, docId: SCORE_DOC_ID });

  const updateInputTime = (value: number) =>
    _updateDocumentValue({ value, docId: INPUT_TIME_DOC_ID });

  const setTime = (time: number) => {
    const date = new Date(time);
    updateHours(date.getHours());
    updateMinute(date.getMinutes());
  };

  const clearScore = () => {
    updateScore(0);
  };
  return { setTime, updateScore, clearScore, updateInputTime };
};
