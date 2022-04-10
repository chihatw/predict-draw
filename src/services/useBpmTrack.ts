import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '../repositories/firebase';
import {
  updateDocumenValue,
  snapshotDocumentValue,
  setDocumenValue,
} from '../repositories/utils';

const COLLECTION = 'bpmTrack';

const BPM_DOC_ID = 'bpm';
const OFFSETS_DOC_ID = 'offsets';
const STOP_AT_DOC_ID = 'stopAt';
const START_AT_DOC_ID = 'startAt';
const TRACK_TYPE_DOC_ID = 'trackType';
const SYNCOPATION_RATIO_DOC_ID = 'syncopationRatio';
const PITCHES_ARRAY_LINES_DOC_ID = 'pitchesArrayLines';

export type PitchesArray = string[][][];

const useBpmTrack = () => {
  const [bpm, setBpm] = useState(0);
  const [stopAt, setStopAt] = useState(0);
  const [startAt, setStartAt] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [offsetsStr, setOffsetsStr] = useState('');
  const [trackType, setTrackType] = useState('syllable');
  const [syncopationRatio, setSyncopationRatio] = useState(100);
  const [pitchesArrayLinesStr, setPitchesArrayLinesStr] = useState('');
  const [pitchesArrayLines, setPitchesArrayLines] = useState<PitchesArray[]>(
    []
  );

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

  const _setDocumentValue = useMemo(
    () =>
      function <T>({ value, docId }: { value: T; docId: string }) {
        setDocumenValue({
          db,
          value,
          colId: COLLECTION,
          docId,
        });
      },
    []
  );

  // JSON.parse
  useEffect(() => {
    if (!pitchesArrayLinesStr) return;
    const pitchesArrayLines: PitchesArray[] = JSON.parse(pitchesArrayLinesStr);
    setPitchesArrayLines(pitchesArrayLines);
  }, [pitchesArrayLinesStr]);

  useEffect(() => {
    if (!offsetsStr) return;
    const offsets: number[] = JSON.parse(offsetsStr);
    setOffsets(offsets);
  }, [offsetsStr]);

  // onSnapshot

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: STOP_AT_DOC_ID,
      initialValue: 0,
      setValue: setStopAt,
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = _snapshotDocumentValue({
      docId: START_AT_DOC_ID,
      initialValue: 0,
      setValue: setStartAt,
    });
    return () => {
      unsub();
    };
  }, []);

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
      docId: PITCHES_ARRAY_LINES_DOC_ID,
      initialValue: '',
      setValue: setPitchesArrayLinesStr,
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

  const updatePitchesArrayLines = (pitchesArrayLines: PitchesArray[]) => {
    _updateDocumentValue({
      docId: PITCHES_ARRAY_LINES_DOC_ID,
      value: JSON.stringify(pitchesArrayLines),
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

  const setRemoteStopAt = (value: number) => {
    _setDocumentValue({ docId: STOP_AT_DOC_ID, value });
  };

  const setRemoteStartAt = (value: number) => {
    _setDocumentValue({ docId: START_AT_DOC_ID, value });
  };

  return {
    bpm,
    stopAt,
    startAt,
    offsets,
    trackType,
    syncopationRatio,
    pitchesArrayLines,
    setStopAt: setRemoteStopAt,
    updateBpm,
    setStartAt: setRemoteStartAt,
    updateOffsets,
    updateTrackType,
    updateSyncopationRatio,
    updatePitchesArrayLines,
  };
};
export default useBpmTrack;
