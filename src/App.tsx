import { useNavigate } from 'react-router-dom';

import useIpInfo from './services/useIpInfo';
import useCards from './services/useCard';
import usePoints from './services/usePoints';
import useResult from './services/useResult';
import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePredict from './services/usePredict';
import usePageState from './services/usePageState';
import useShowPanes from './services/useShowPanes';

function App() {
  useIpInfo();
  const { liSanPageState, kouSanPageState } = usePageState();
  const { showScorePane, showRatioPane, showPredictPane, handleShowPane } =
    useShowPanes();
  const navigate = useNavigate();
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
        cards,
        predict,
        liSanPoints,
        kouSanPoints,
        liSanPageState,
        kouSanPageState,
        showScorePane,
        showRatioPane,
        showPredictPane,
        handleNavigate,
        handlePredict,
        handleResult,

        handleShowPane,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
