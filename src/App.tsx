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
import usePitches from './services/usePitches';

function App() {
  useIpInfo();
  const { note1PitchList, handleUpdatePitchList } = usePitches();
  const { liSanPageState, kouSanPageState, notesPageState } = usePageState();
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
        notesPageState,
        kouSanPageState,
        showPredictPane,
        handlePredict,
        handleNavigate,
        handleShowPane,
        handleUpdateDrawn,
        note1PitchList,
        handleUpdatePitchList,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
