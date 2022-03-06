import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../repositories/firebase';

const usePredict = () => {
  const [predict, setPredict] = useState('');
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'game', 'predict'),
      (doc) => {
        console.log(`fetch predict`);
        const { value } = (doc.data() as { value: string }) || { value: '' };
        setPredict(value);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handlePredict = async (value: string) => {
    console.log('update predict');
    await updateDoc(doc(db, 'game', 'predict'), { value });
  };
  return { predict, handlePredict };
};
export default usePredict;
