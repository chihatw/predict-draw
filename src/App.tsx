import { useNavigate } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/usePageState';

function App() {
  const {
    liSanPageState,
    kouSanPageState,
    updateLiSanPageState,
    updateKouSanPageState,
  } = usePageState();
  const navigate = useNavigate();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };
  return (
    <AppContext.Provider
      value={{
        liSanPageState,
        kouSanPageState,
        handleNavigate,
        updateLiSanPageState,
        updateKouSanPageState,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
