import { useNavigate } from 'react-router-dom';

import useUser from './services/useUser';
import useCards from './services/useCard';
import usePoints from './services/usePoints';
import useResult from './services/useResult';
import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePredict from './services/usePredict';

function App() {
  const navigate = useNavigate();
  const { user, handleLogout, handleSetUser } = useUser();
  const { cards } = useCards();
  const { predict, handlePredict } = usePredict();
  const { handleResult } = useResult();
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
        handlePredict,
        handleResult,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
