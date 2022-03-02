import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppComponent from './components/AppComponent';

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

  const handleSetUser = (value: string) => {
    setUser(value);
    localStorage.setItem('user', value);
  };
  const handleLogout = () => {
    setUser('');
    localStorage.setItem('user', '');
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
