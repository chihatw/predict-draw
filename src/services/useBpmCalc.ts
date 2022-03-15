import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';
import { BpmCalcLabel, INITIAL_BPM_CALC_LABEL } from './context';

const COLLECTION = 'bpmCalc';
const BPM_DOC_ID = 'bpm';
const LABEL_DOC_ID = 'label';
const IS_RUNNING_DOC_ID = 'isRunning';

const useBpmCalc = () => {
  const [label, setLabel] = useState<BpmCalcLabel>(INITIAL_BPM_CALC_LABEL);
  const [bpm, setBpm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, LABEL_DOC_ID),
      (doc) => {
        const label = (doc.data() as BpmCalcLabel) || INITIAL_BPM_CALC_LABEL;
        setLabel(label);
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
      doc(db, COLLECTION, IS_RUNNING_DOC_ID),
      (doc) => {
        const { flag } = (doc.data() as { flag: boolean }) || { flag: false };
        setIsRunning(flag);
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

  const handleStartTimer = () => {
    updateDoc(doc(db, COLLECTION, BPM_DOC_ID), { bpm: 0 });
    updateDoc(doc(db, COLLECTION, IS_RUNNING_DOC_ID), { flag: true });
  };

  const handleStopTiemr = (miliSeconds: number) => {
    const bpm = calcBpm({
      miliSeconds,
      syllableCount: label.syllableCount,
    });
    updateDoc(doc(db, COLLECTION, BPM_DOC_ID), { bpm });
    updateDoc(doc(db, COLLECTION, IS_RUNNING_DOC_ID), { flag: false });
  };

  return {
    bpmCalcBpm: bpm,
    bpmCalcLabel: label,
    isBpmCalcRunning: isRunning,
    handleStopBpmCalcTiemr: handleStopTiemr,
    handleStartBpmCalcTimer: handleStartTimer,
  };
};
export default useBpmCalc;

const calcBpm = ({
  miliSeconds,
  syllableCount,
}: {
  miliSeconds: number;
  syllableCount: number;
}) => {
  const seconds = miliSeconds / 1000;
  return Math.floor((syllableCount / seconds) * 60);
};
