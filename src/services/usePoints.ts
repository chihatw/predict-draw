import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'points';
const LI_SAN_ID = 'liSan';
const KOU_SAN_ID = 'kouSan';

const usePoints = () => {
  const [liSanPoints, setLiSanPoints] = useState(0);
  const [kouSanPoints, setKouSanPoints] = useState(0);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, LI_SAN_ID),
      (doc) => {
        const { points } = (doc.data() as { points: number }) || {
          points: 0,
        };
        console.log(points);
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
      doc(db, COLLECTION, KOU_SAN_ID),
      (doc) => {
        const { points } = (doc.data() as { points: number }) || { points: 33 };
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

  return {
    liSanPoints,
    kouSanPoints,
  };
};
export default usePoints;
