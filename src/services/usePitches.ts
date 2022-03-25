import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

import { db } from '../repositories/firebase';
import { pitchesArray } from './context';

const COLLECTION = 'pitches';
const DOC_ID = 'note1';

const usePitches = () => {
  const [note1PitchList, setNote1PitchList] = useState<
    [string, pitchesArray][]
  >([]);
  // note1の監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, DOC_ID),
      (doc) => {
        console.log(`fetch ${COLLECTION}.${DOC_ID}`);
        const { pitchList } = (doc.data() as { pitchList: string }) || {
          pitchList: '',
        };
        const parsed: [string, pitchesArray][] = JSON.parse(pitchList);
        setNote1PitchList(parsed);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const updatePitchList = ({
    note,
    pitchList,
  }: {
    note: 'note1' | 'note2';
    pitchList: [string, pitchesArray][];
  }) => {
    console.log(`update pitchList`);
    updateDoc(doc(db, COLLECTION, note), {
      pitchList: JSON.stringify(pitchList),
    });
  };
  return { note1PitchList, updatePitchList };
};
export default usePitches;
