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
import useBpmCalc from './services/useBpmCalc';
import useBpmTrack from './services/useBpmTrack';

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
  const {
    bpmCalcBpm,
    bpmCalcLabel,
    isBpmCalcRunning,
    handleStopBpmCalcTiemr,
    handleStartBpmCalcTimer,
  } = useBpmCalc();
  const {
    bpmTrackBpm,
    bpmTrackType,
    bpmTrackStopAt,
    bpmTrackOffsets,
    bpmTrackStartAt,
    bpmTrackBpmPitchesArray,
    updateBpmTrackBpm,
    updateBpmTrackType,
    updateBpmTrackStopAt,
    updateBpmTrackOffsets,
    updateBpmPitchesArray,
    updateBpmTrackStartAt,
  } = useBpmTrack();

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
        bpmCalcBpm,
        liSanPoints,
        bpmTrackBpm,
        kouSanPoints,
        bpmCalcLabel,
        bpmTrackType,
        showScorePane,
        showRatioPane,
        bpmTrackStopAt,
        note1PitchList,
        liSanPageState,
        notesPageState,
        bpmTrackOffsets,
        bpmTrackStartAt,
        kouSanPageState,
        showPredictPane,
        isBpmCalcRunning,
        bpmTrackBpmPitchesArray,
        updateDrawn,
        updatePredict,
        updateYesRatio,
        handleNavigate,
        handleShowPane,
        updateNewGameAt,
        updatePitchList,
        updateBpmTrackBpm,
        updateBpmTrackType,
        updateBpmTrackStopAt,
        updateNotesPageState,
        updateLiSanPageState,
        updateBpmTrackOffsets,
        updateBpmPitchesArray,
        updateBpmTrackStartAt,
        updateKouSanPageState,
        handleStopBpmCalcTiemr,
        handleStartBpmCalcTimer,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
