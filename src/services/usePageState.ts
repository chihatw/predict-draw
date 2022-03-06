import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const LI_SAN_PROP = 'liSanPageState';
const KOU_SAN_PROP = 'kouSanPageState';

const usePageState = () => {
  const [liSanPageState, setLiSanPageState] = useState('');
  const [kouSanPageState, setKouSanPageState] = useState('');

  // 李さんの状態監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'game', LI_SAN_PROP),
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
      doc(db, 'game', KOU_SAN_PROP),
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
