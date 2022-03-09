import { useNavigate } from 'react-router-dom';

import useIpInfo from './services/useIpInfo';
import useYesRatio from './services/useYesRatio';
import usePoints from './services/usePoints';
import useDrawn from './services/useDrawn';
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
  const { drawn, handleUpdateDrawn } = useDrawn();
  const { predict, handlePredict } = usePredict();
  const { liSanPoints, kouSanPoints } = usePoints();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };
  return (
    <AppContext.Provider
      value={{
        drawn,
        predict,
        yesRatio,
        newGameAt,
        liSanPoints,
        kouSanPoints,
        showScorePane,
        showRatioPane,
        liSanPageState,
        kouSanPageState,
        showPredictPane,
        handlePredict,
        handleNavigate,
        handleShowPane,
        handleUpdateDrawn,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
