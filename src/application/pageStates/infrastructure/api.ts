import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { IPageState } from '../core/0-interface';

export const PAGE_STATES_COLLECTION = 'pageStates';

export const fetchPageStates = async () => {
  console.log(`%cfetch ${PAGE_STATES_COLLECTION}`, 'color:red');

  const q = query(collection(db, PAGE_STATES_COLLECTION));

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
  console.log(`%cupdate ${PAGE_STATES_COLLECTION}`, 'color:red');
  await updateDoc(doc(db, PAGE_STATES_COLLECTION, id), { state });
};
