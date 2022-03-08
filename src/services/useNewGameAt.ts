import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

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
  return { newGameAt };
};
export default useNewGameAt;
