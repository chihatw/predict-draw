import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'times';
const TIME_DOC_ID = 'time';
const SCORE_DOC_ID = 'score';
const INPUT_TIME_DOC_ID = 'inputTime';

export const useTimes = () => {
  const [time, setTime] = useState(new Date());
  const [score, setScore] = useState(0);
  const [inputTime, setInputTime] = useState(new Date());

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, SCORE_DOC_ID),
      (snapshot) => {
        console.log('snapshot score');
        if (snapshot.exists()) {
          const score: number = snapshot.data().score;
          setScore(score);
        } else {
          setScore(0);
        }
      },
      (e) => {
        console.warn(e);
        setScore(0);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, INPUT_TIME_DOC_ID),
      (snapshot) => {
        if (snapshot.exists()) {
          const time: Date = new Date(snapshot.data().time);
          setInputTime(time);
        } else {
          setInputTime(new Date());
        }
      },
      () => {}
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, TIME_DOC_ID),
      (snapshot) => {
        if (snapshot.exists()) {
          const time: Date = new Date(snapshot.data().time);
          setTime(time);
        }
      },
      (e) => {
        console.warn(e);
        setTime(new Date());
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return { time, inputTime, score };
};

export const useHandleTimes = () => {
  const setTime = (time: number) => {
    console.log('set time');
    setDoc(doc(db, COLLECTION, TIME_DOC_ID), { time })
      .then(() => {})
      .catch((e) => {
        console.warn(e);
      });
  };
  const setInputTime = (time: number) => {
    console.log('set input time');
    setDoc(doc(db, COLLECTION, INPUT_TIME_DOC_ID), { time })
      .then(() => {})
      .catch((e) => {
        console.warn(e);
      });
  };
  const setScore = (score: number) => {
    console.log('set score');
    setDoc(doc(db, COLLECTION, SCORE_DOC_ID), { score })
      .then()
      .catch((e) => {
        console.warn(e);
      });
  };
  const clearScore = () => {
    console.log('set score');
    setDoc(doc(db, COLLECTION, SCORE_DOC_ID), { score: 0 })
      .then()
      .catch((e) => {
        console.warn(e);
      });
  };
  return { setTime, setInputTime, setScore, clearScore };
};
