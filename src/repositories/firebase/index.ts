import { getFirestore } from '@firebase/firestore';
import { initializeApp } from '@firebase/app';

import config from './config';
import { getStorage } from 'firebase/storage';

const firebaseApp = initializeApp(config);

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
