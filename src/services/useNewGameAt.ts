import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

import { db } from '../repositories/firebase';

const COLLECTION = 'game';
const DOC_ID = 'newGameAt';

const useNewGameAt = () => {
  const [newGameAt, setNewGameAt] = useState(0);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${DOC_ID}`);
        const { date } = (doc.data() as { date: number }) || { date: 0 };
        setNewGameAt(date);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const updateNewGameAt = () => {
    console.log('update new game at');
    updateDoc(doc(db, COLLECTION, DOC_ID), { date: Date.now() });
  };
  return { newGameAt, updateNewGameAt };
};
export default useNewGameAt;
