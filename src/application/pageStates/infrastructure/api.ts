import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { IPageState } from '../core/0-interface';

export const COLLECTION = 'pageStates';

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

export const changePageState = async (id: string, state: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  await updateDoc(doc(db, COLLECTION, id), { state });
};
