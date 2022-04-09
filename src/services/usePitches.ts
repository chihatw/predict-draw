import { useEffect, useMemo, useState } from 'react';
import { Unsubscribe } from 'firebase/firestore';

import { db } from '../repositories/firebase';

import {
  updateDocumenValue,
  snapshotDocumentValue,
} from '../repositories/utils';

export type PitchesArray = string[][][];

const COLLECTION = 'pitches';
const NOTE1_DOC_ID = 'note1';

const usePitches = () => {
  const [pitchListStr, setPitchListStr] = useState('');

  const [note1PitchList, setNote1PitchList] = useState<
    [string, PitchesArray][]
  >([]);

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
    if (!pitchListStr) return;
    const pitchList: [string, PitchesArray][] = JSON.parse(pitchListStr);
    setNote1PitchList(pitchList);
  }, [pitchListStr]);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: NOTE1_DOC_ID,
      initialValue: '',
      setValue: setPitchListStr,
    });
    return () => {
      unsub();
    };
  }, []);

  const updateNote1 = (value: string) =>
    _updateDocumentValue({ value, docId: NOTE1_DOC_ID });

  const updatePitchList = (pitchList: [string, PitchesArray][]) => {
    updateNote1(JSON.stringify(pitchList));
  };
  return { note1PitchList, updatePitchList };
};
export default usePitches;
