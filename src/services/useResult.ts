import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../repositories/firebase';

const useResult = () => {
  const [result, setResult] = useState('');
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'game', 'result'),
      (doc) => {
        const { value } = (doc.data() as { value: string }) || { value: '' };
        console.log(value);
        setResult(value);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleResult = async (value: string) => {
    await updateDoc(doc(db, 'game', 'result'), { value });
  };
  return { result, handleResult };
};
export default useResult;
