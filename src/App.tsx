import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';

import useUser from './services/useUser';
import AppComponent from './components/AppComponent';
import AppContext from './services/context';
import useCards from './services/useCard';
import usePredict from './services/usePredict';
import usePoints from './services/usePoints';

function App() {
  const navigate = useNavigate();
  const { user, handleLogout, handleSetUser } = useUser();
  const { cards } = useCards();
  const { predict } = usePredict();
  const { liSanPoints, kouSanPoints } = usePoints();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        cards,
        predict,
        liSanPoints,
        kouSanPoints,
        handleLogout,
        handleSetUser,
        handleNavigate,
      }}
    >
      <AppComponent />
    </AppContext.Provider>
  );
}

export default App;
