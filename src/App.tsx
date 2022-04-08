import { useNavigate } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/usePageState';

function App() {
  const { liSanPageState, kouSanPageState } = usePageState();
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
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
