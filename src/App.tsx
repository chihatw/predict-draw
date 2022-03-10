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
  const { note1PitchList, updatePitchList } = usePitches();
  const {
    notesPageState,
    liSanPageState,
    kouSanPageState,
    updateNotesPageState,
    updateLiSanPageState,
    updateKouSanPageState,
  } = usePageState();
  const { showScorePane, showRatioPane, showPredictPane, handleShowPane } =
    useShowPanes();
  const navigate = useNavigate();
  const { yesRatio, updateYesRatio } = useYesRatio();
  const { newGameAt, updateNewGameAt } = useNewGameAt();
  const { drawn, updateDrawn } = useDrawn();
  const { predict, updatePredict } = usePredict();
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
        note1PitchList,
        liSanPageState,
        notesPageState,
        kouSanPageState,
        showPredictPane,
        updateDrawn,
        updatePredict,
        handleNavigate,
        updateYesRatio,
        handleShowPane,
        updateNewGameAt,
        updatePitchList,
        updateNotesPageState,
        updateLiSanPageState,
        updateKouSanPageState,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
