import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import AppComponent from './components/AppComponent';
import { db } from './repositories/firebase';

export const AppContext = createContext<{
  user: string;
  handleLogout: () => void;
  handleSetUser: (value: string) => void;
  handleNavigate: (pathname: string) => void;
}>({
  user: '',
  handleLogout: () => {},
  handleSetUser: () => {},
  handleNavigate: () => {},
});

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  useEffect(() => {
    const _user = localStorage.getItem('user') || '';
    setUser(_user);
  }, []);

  const handleSetUser = async (value: string) => {
    setUser(value);
    localStorage.setItem('user', value);
    await addDoc(collection(db, value), { loginAt: Date.now() });
  };
  const handleLogout = async () => {
    const _user = user;
    setUser('');
    localStorage.setItem('user', '');
    const querySnapshot = await getDocs(query(collection(db, _user), limit(1)));
    await deleteDoc(querySnapshot.docs[0].ref);
  };
  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };
  return (
    <AppContext.Provider
      value={{ user, handleSetUser, handleLogout, handleNavigate }}
    >
      <AppComponent />
    </AppContext.Provider>
  );
}

export default App;
