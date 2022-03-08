import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '../repositories/firebase';

const COLLECTION = 'game';
const DOC_ID = 'yesRatio';

const useYesRatio = () => {
  const [yesRatio, setYesRatio] = useState(0);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${DOC_ID}`);
        const { ratio } = (doc.data() as { ratio: number }) || { ratio: 0 };
        setYesRatio(ratio);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return { yesRatio };
};
export default useYesRatio;
