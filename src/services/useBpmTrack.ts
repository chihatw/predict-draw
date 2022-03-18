import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'bpmTrack';
const BPM_DOC_ID = 'bpm';
const OFFSETS_DOC_ID = 'offsets';
const TRACK_TYPE_DOC_ID = 'trackType';
const SYNCOPATION_RATIO_DOC_ID = 'syncopationRatio';
const BPM_PITCHES_ARRAY_DOC_ID = 'bpmPitchesArray';

const useBpmTrack = () => {
  const [bpm, setBpm] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [trackType, setTrackType] = useState('syllable');
  const [bpmPitchesArray, setBpmPitchesArray] = useState<string[][][]>([]);
  const [syncopationRatio, setSyncopationRatio] = useState(100);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, SYNCOPATION_RATIO_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${SYNCOPATION_RATIO_DOC_ID}`);
        const { ratio } = (doc.data() as { ratio: number }) || { ratio: 100 };
        setSyncopationRatio(ratio);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, BPM_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${BPM_DOC_ID}`);
        const { bpm } = (doc.data() as { bpm: number }) || { bpm: 0 };
        setBpm(bpm);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, TRACK_TYPE_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${TRACK_TYPE_DOC_ID}`);
        const { type } = (doc.data() as { type: string }) || {
          type: 'syllable',
        };
        setTrackType(type);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, BPM_PITCHES_ARRAY_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${BPM_PITCHES_ARRAY_DOC_ID}`);
        const { json } = (doc.data() as { json: string }) || {
          json: '[]',
        };
        const bpmPitchesArray: string[][][] = JSON.parse(json);
        setBpmPitchesArray(bpmPitchesArray);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, OFFSETS_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${OFFSETS_DOC_ID}`);
        const { json } = (doc.data() as { json: string }) || {
          json: '[]',
        };
        const offsets: number[] = JSON.parse(json);
        setOffsets(offsets);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const updateBpm = (bpm: number) => {
    console.log(`update ${COLLECTION}.${BPM_DOC_ID}`);
    updateDoc(doc(db, COLLECTION, BPM_DOC_ID), { bpm });
  };
  const updateBpmPitchesArray = (bpmPitchesArray: string[][][]) => {
    console.log(`update ${COLLECTION}.${BPM_PITCHES_ARRAY_DOC_ID}`);
    const json = JSON.stringify(bpmPitchesArray);
    updateDoc(doc(db, COLLECTION, BPM_PITCHES_ARRAY_DOC_ID), { json });
  };
  const updateOffsets = (offsets: number[]) => {
    console.log(`update ${COLLECTION}.${OFFSETS_DOC_ID}`);
    const json = JSON.stringify(offsets);
    updateDoc(doc(db, COLLECTION, OFFSETS_DOC_ID), { json });
  };
  const updateSyncopationRatio = (ratio: number) => {
    console.log(`update ${COLLECTION}.${SYNCOPATION_RATIO_DOC_ID}`);
    updateDoc(doc(db, COLLECTION, SYNCOPATION_RATIO_DOC_ID), { ratio });
  };
  const updateTrackType = (type: string) => {
    console.log(`update ${COLLECTION}.${TRACK_TYPE_DOC_ID}`);
    updateDoc(doc(db, COLLECTION, TRACK_TYPE_DOC_ID), { type });
  };
  return {
    bpmTrackBpm: bpm,
    bpmTrackType: trackType,
    bpmTrackOffsets: offsets,
    syncopationRatio,
    bpmTrackBpmPitchesArray: bpmPitchesArray,
    updateBpmTrackBpm: updateBpm,
    updateBpmTrackType: updateTrackType,
    updateBpmTrackOffsets: updateOffsets,
    updateBpmPitchesArray,
    updateSyncopationRatio,
  };
};
export default useBpmTrack;
