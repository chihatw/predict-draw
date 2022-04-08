import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  updateDocumenValue,
  snapshotDocumentValue,
} from '../repositories/utils';

const COLLECTION = 'bpmTrack';

const BPM_DOC_ID = 'bpm';
const OFFSETS_DOC_ID = 'offsets';
const TRACK_TYPE_DOC_ID = 'trackType';
const SYNCOPATION_RATIO_DOC_ID = 'syncopationRatio';
const BPM_PITCHES_ARRAY_DOC_ID = 'bpmPitchesArray';

const useBpmTrack = () => {
  const [bpm, setBpm] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [offsetsStr, setOffsetsStr] = useState('');
  const [trackType, setTrackType] = useState('syllable');
  const [bpmPitchesArray, setPitchesArray] = useState<string[][][]>([]);
  const [syncopationRatio, setSyncopationRatio] = useState(100);
  const [bpmPitchesArrayStr, setBpmPitchesArrayStr] = useState('');

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
    if (!offsetsStr) return;
    const offsets: number[] = JSON.parse(offsetsStr);
    setOffsets(offsets);
  }, [offsetsStr]);

  useEffect(() => {
    if (!bpmPitchesArrayStr) return;
    const bpmPitchesArray: string[][][] = JSON.parse(bpmPitchesArrayStr);
    setPitchesArray(bpmPitchesArray);
  }, [bpmPitchesArrayStr]);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: SYNCOPATION_RATIO_DOC_ID,
      initialValue: 100,
      setValue: setSyncopationRatio,
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

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: TRACK_TYPE_DOC_ID,
      initialValue: 'syllable',
      setValue: setTrackType,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: BPM_PITCHES_ARRAY_DOC_ID,
      initialValue: '',
      setValue: setBpmPitchesArrayStr,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: OFFSETS_DOC_ID,
      initialValue: '',
      setValue: setOffsetsStr,
    });
    return () => {
      unsub();
    };
  }, []);

  const updateBpm = (bpm: number) => {
    _updateDocumentValue({ docId: BPM_DOC_ID, value: bpm });
  };
  const updateBpmPitchesArray = (bpmPitchesArray: string[][][]) => {
    _updateDocumentValue({
      docId: BPM_PITCHES_ARRAY_DOC_ID,
      value: JSON.stringify(bpmPitchesArray),
    });
  };
  const updateOffsets = (offsets: number[]) => {
    _updateDocumentValue({
      docId: OFFSETS_DOC_ID,
      value: JSON.stringify(offsets),
    });
  };
  const updateSyncopationRatio = (ratio: number) => {
    _updateDocumentValue({ docId: SYNCOPATION_RATIO_DOC_ID, value: ratio });
  };
  const updateTrackType = (type: string) => {
    _updateDocumentValue({ docId: TRACK_TYPE_DOC_ID, value: type });
  };
  return {
    bpm,
    trackType,
    offsets,
    syncopationRatio,
    bpmPitchesArray,
    updateBpm,
    updateTrackType,
    updateOffsets,
    updateBpmPitchesArray,
    updateSyncopationRatio,
  };
};
export default useBpmTrack;
