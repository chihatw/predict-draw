import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { IPageState } from '../core/0-interface';

const COLLECTION = 'pageStates';

export const fetchPageStates = async () => {
  console.log(`%cfetch ${COLLECTION}`, 'color:red');

  const q = query(collection(db, COLLECTION));

  const querySnapshot = await getDocs(q);

  const pageStates: IPageState[] = [];
  querySnapshot.forEach((doc) => {
    const { state } = doc.data();
    pageStates.push({
      id: doc.id,
      state,
    });
  });

  return pageStates;
};
