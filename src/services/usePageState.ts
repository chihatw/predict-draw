import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'pageStates';
const LI_SAN_PROP = 'liSan';
const KOU_SAN_PROP = 'kouSan';

const usePageState = () => {
  const [liSanPageState, setLiSanPageState] = useState('');
  const [kouSanPageState, setKouSanPageState] = useState('');

  // 李さんの状態監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, LI_SAN_PROP),
      (doc) => {
        console.log(`fetch ${LI_SAN_PROP}`);
        const { state } = (doc.data() as { state: string }) || { state: '' };
        setLiSanPageState(state);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  // 黄さんの状態監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, KOU_SAN_PROP),
      (doc) => {
        console.log(`fetch ${KOU_SAN_PROP}`);
        const { state } = (doc.data() as { state: string }) || { state: '' };
        setKouSanPageState(state);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return { liSanPageState, kouSanPageState };
};
export default usePageState;
