import { useNavigate } from 'react-router-dom';

import useIpInfo from './services/useIpInfo';
import useYesRatio from './services/useYesRatio';
import usePoints from './services/usePoints';
import useResult from './services/useResult';
import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePredict from './services/usePredict';
import usePageState from './services/usePageState';
import useShowPanes from './services/useShowPanes';
import useNewGameAt from './services/useNewGameAt';

function App() {
  useIpInfo();
  const { liSanPageState, kouSanPageState } = usePageState();
  const { showScorePane, showRatioPane, showPredictPane, handleShowPane } =
    useShowPanes();
  const navigate = useNavigate();
  const { yesRatio } = useYesRatio();
  const { newGameAt } = useNewGameAt();
  const { handleResult } = useResult();
  const { predict, handlePredict } = usePredict();
  const { liSanPoints, kouSanPoints } = usePoints();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };
  return (
    <AppContext.Provider
      value={{
        predict,
        yesRatio,
        newGameAt,
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
