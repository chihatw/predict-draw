import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'bpmTrack';
const BPM_DOC_ID = 'bpm';
const STOP_AT_DOC_ID = 'stopAt';
const OFFSETS_DOC_ID = 'offsets';
const START_AT_DOC_ID = 'startAt';
const TRACK_TYPE_DOC_ID = 'trackType';
const BPM_PITCHES_ARRAY_DOC_ID = 'bpmPitchesArray';

const useBpmTrack = () => {
  const [bpm, setBpm] = useState(0);
  const [stopAt, setStopAt] = useState(0);
  const [startAt, setStartAt] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [trackType, setTrackType] = useState('syllable');
  const [bpmPitchesArray, setBpmPitchesArray] = useState<string[][][]>([]);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, STOP_AT_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${STOP_AT_DOC_ID}`);
        const { stopAt } = (doc.data() as { stopAt: number }) || { stopAt: 0 };
        setStopAt(stopAt);
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
      doc(db, COLLECTION, START_AT_DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${START_AT_DOC_ID}`);
        const { startAt } = (doc.data() as { startAt: number }) || {
          startAt: 0,
        };
        setStartAt(startAt);
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
  const updateStartAt = (startAt: number) => {
    console.log(`update ${COLLECTION}.${START_AT_DOC_ID}`);
    updateDoc(doc(db, COLLECTION, START_AT_DOC_ID), { startAt });
  };
  const updateStopAt = (stopAt: number) => {
    console.log(`update ${COLLECTION}.${STOP_AT_DOC_ID}`);
    updateDoc(doc(db, COLLECTION, STOP_AT_DOC_ID), { stopAt });
  };
  const updateTrackType = (type: string) => {
    console.log(`update ${COLLECTION}.${TRACK_TYPE_DOC_ID}`);
    updateDoc(doc(db, COLLECTION, TRACK_TYPE_DOC_ID), { type });
  };
  return {
    bpmTrackBpm: bpm,
    bpmTrackType: trackType,
    bpmTrackStopAt: stopAt,
    bpmTrackOffsets: offsets,
    bpmTrackStartAt: startAt,
    bpmTrackBpmPitchesArray: bpmPitchesArray,
    updateBpmTrackBpm: updateBpm,
    updateBpmTrackType: updateTrackType,
    updateBpmTrackStopAt: updateStopAt,
    updateBpmTrackOffsets: updateOffsets,
    updateBpmPitchesArray,
    updateBpmTrackStartAt: updateStartAt,
  };
};
export default useBpmTrack;
