import { useNavigate } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import usePitches from './services/usePitches';
import AppContext from './services/context';
import useBpmTrack from './services/useBpmTrack';
import usePageState from './services/usePageState';

function App() {
  const { note1PitchList, updatePitchList } = usePitches();
  const {
    notesPageState,
    liSanPageState,
    kouSanPageState,
    updateNotesPageState,
    updateLiSanPageState,
    updateKouSanPageState,
  } = usePageState();
  const navigate = useNavigate();
  const {
    bpmTrackBpm,
    bpmTrackType,
    bpmTrackOffsets,
    syncopationRatio,
    bpmTrackBpmPitchesArray,
    updateBpmTrackBpm,
    updateBpmTrackType,
    updateBpmTrackOffsets,
    updateBpmPitchesArray,
    updateSyncopationRatio,
  } = useBpmTrack();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };
  return (
    <AppContext.Provider
      value={{
        bpmTrackBpm,
        bpmTrackType,
        note1PitchList,
        liSanPageState,
        notesPageState,
        bpmTrackOffsets,
        kouSanPageState,
        syncopationRatio,
        bpmTrackBpmPitchesArray,
        handleNavigate,
        updatePitchList,
        updateBpmTrackBpm,
        updateBpmTrackType,
        updateNotesPageState,
        updateLiSanPageState,
        updateBpmTrackOffsets,
        updateBpmPitchesArray,
        updateKouSanPageState,

        updateSyncopationRatio,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
