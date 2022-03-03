import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const usePoints = () => {
  const [liSanPoints, setLiSanPoints] = useState(0);
  const [kouSanPoints, setKouSanPoints] = useState(0);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'game', 'li-san-points'),
      (doc) => {
        const { points } = (doc.data() as { points: number }) || { points: '' };
        setLiSanPoints(points);
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
      doc(db, 'game', 'kou-san-points'),
      (doc) => {
        const { points } = (doc.data() as { points: number }) || { points: '' };
        setKouSanPoints(points);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleUpdateLiSanPoints = async (points: number) => {
    await updateDoc(doc(db, 'game', 'li-san-points'), { points });
  };
  const handleUpdateKouSanPoints = async (points: number) => {
    await updateDoc(doc(db, 'game', 'kou-san-points'), { points });
  };
  return {
    liSanPoints,
    kouSanPoints,
    handleUpdateLiSanPoints,
    handleUpdateKouSanPoints,
  };
};
export default usePoints;
