import {
  query,
  limit,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../repositories/firebase';

const setState = async ({ user, state }: { user: string; state: string }) => {
  await updateDoc(doc(db, 'game', user), { state });
};

const useUser = () => {
  const { pathname } = useLocation();

  const [user, setUser] = useState('');
  useEffect(() => {
    const _user = localStorage.getItem('user') || '';
    setUser(_user);
  }, []);

  useEffect(() => {
    if (!user) return;
    switch (pathname) {
      case '/predict':
        setState({ user, state: 'predicting' });
        break;
      case '/draw':
        setState({ user, state: 'drawing' });
        break;
      default:
        setState({ user, state: 'sleeping' });
        break;
    }
  }, [pathname]);
  const handleSetUser = async (value: string) => {
    setUser(value);
    localStorage.setItem('user', value);
    await addDoc(collection(db, value), { loginAt: Date.now() });
  };
  const handleLogout = async () => {
    const _user = user;
    setState({ user, state: 'sleeping' });
    setUser('');
    localStorage.setItem('user', '');
    const querySnapshot = await getDocs(query(collection(db, _user), limit(1)));

    await deleteDoc(querySnapshot.docs[0].ref);
  };
  return { user, handleSetUser, handleLogout };
};

export default useUser;
