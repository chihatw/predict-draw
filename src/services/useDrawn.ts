import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../repositories/firebase';

const COLLECTION = 'game';
const DOC_ID = 'result';

const useDrawn = () => {
  const [drawn, setDrawn] = useState<'yes' | 'no' | ''>('');
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (doc) => {
        const { value } = (doc.data() as { value: 'yes' | 'no' | '' }) || {
          value: '',
        };
        setDrawn(value);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const updateDrawn = async (value: string) => {
    await updateDoc(doc(db, COLLECTION, DOC_ID), { value });
  };
  return { drawn, updateDrawn };
};
export default useDrawn;
