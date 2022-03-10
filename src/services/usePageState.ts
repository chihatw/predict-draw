import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'pageStates';
const LI_SAN_PROP = 'liSan';
const KOU_SAN_PROP = 'kouSan';
const NOTES_PROP = 'notes';

const usePageState = () => {
  const [liSanPageState, setLiSanPageState] = useState('');
  const [kouSanPageState, setKouSanPageState] = useState('');
  const [notesPageState, setNotesPageState] = useState('');

  // ノートの状態監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, NOTES_PROP),
      (doc) => {
        console.log(`fetch ${NOTES_PROP}`);
        const { state } = (doc.data() as { state: string }) || { state: '' };
        setNotesPageState(state);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

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

  const updateLiSanPageState = (state: string) => {
    setLiSanPageState(state);
    console.log(`set ${LI_SAN_PROP}`);
    setDoc(doc(db, COLLECTION, LI_SAN_PROP), { state });
  };

  const updateKouSanPageState = (state: string) => {
    setKouSanPageState(state);
    console.log(`set ${KOU_SAN_PROP}`);
    setDoc(doc(db, COLLECTION, KOU_SAN_PROP), { state });
  };

  const updateNotesPageState = (state: string) => {
    setNotesPageState(state);
    console.log(`set ${NOTES_PROP}`);
    setDoc(doc(db, COLLECTION, NOTES_PROP), { state });
  };
  return {
    notesPageState,
    liSanPageState,
    kouSanPageState,
    updateNotesPageState,
    updateLiSanPageState,
    updateKouSanPageState,
  };
};
export default usePageState;
