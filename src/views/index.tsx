import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { cuePatternActions } from 'application/cuePattern/framework/0-reducer';
import { cuePatternParamsActions } from 'application/cuePatternParams/framework/0-reducer';
import { cueWorkoutCueActions } from 'application/cueWorkoutCue/framework/0-reducer';
import { listenCueWorkoutCue } from 'application/cueWorkoutCue/infrastructure/api';
import { cueWorkoutParamsActions } from 'application/cueWorkoutParams/framework/0-reducer';
import { listenCueWorkoutParams } from 'application/cueWorkoutParams/infrastructure/api';
import { noteActions } from 'application/note/framework/0-reducer';
import { listenNote } from 'application/note/infrastructure/api';
import { pageStatesActions } from 'application/pageStates/framework/0-reducer';
import { listenPageStates } from 'application/pageStates/infrastructure/api';
import { recordVoiceAssetsActions } from 'application/recordVoiceAssets/framework/0-reducer';
import { listenRecordVoiceAssets } from 'application/recordVoiceAssets/infrastructure/api';
import { recordVoiceParamsActions } from 'application/recordVoiceParams/framework/0-reducer';
import { listenRecordVoiceParams } from 'application/recordVoiceParams/infrastructure/api';
import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import { listenSpeedWorkoutParams } from 'application/speedWorkoutParams/infrastracture/api';
import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { RootState } from 'main';
import MngNotePage from './pages/MngNotePage';
import MngPage from './pages/MngPage';
import NotePage from './pages/Note/NotePage';
import SpeedWorkoutEditPage from './pages/SpeedWorkoutEditPage';
import TopPage from './pages/TopPage';
import UserPage from './pages/UserPage';

function App() {
  const dispatch = useDispatch();
  const pageStates = useSelector(
    (state: RootState) => state.pageStates.entities
  );
  const {
    speedWorkoutParams,
    cueWorkoutParams,
    cuePatternParams,
    cuePattern,
    cueWorkoutCue,
    note,
    recordVoiceParams,
    recordVoiceAssets,
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    const unsub = listenPageStates(pageStates, (value) =>
      dispatch(pageStatesActions.upsertPageStates(value))
    );
    return () => {
      unsub();
    };
  }, [pageStates]);

  useEffect(() => {
    const unsub = listenSpeedWorkoutParams(speedWorkoutParams, (value) =>
      dispatch(speedWorkoutParamsActions.setParams(value))
    );
    return () => {
      unsub();
    };
  }, [speedWorkoutParams]);

  useEffect(() => {
    const unsub = listenCueWorkoutParams(
      cueWorkoutParams,
      cuePatternParams,
      (value) => dispatch(cueWorkoutParamsActions.setProps(value)),
      (value) => dispatch(cuePatternParamsActions.setProps(value))
    );
    return () => {
      unsub();
    };
  }, [cueWorkoutParams, cuePatternParams]);

  useEffect(() => {
    const unsub = listenCueWorkoutCue(
      cueWorkoutCue,
      cuePattern,
      (value) => dispatch(cueWorkoutCueActions.setProps(value)),
      (value) => dispatch(cuePatternActions.setProps(value))
    );
    return () => {
      unsub();
    };
  }, [cueWorkoutCue, cuePattern]);

  useEffect(() => {
    const unsub = listenNote(note, (value) =>
      dispatch(noteActions.setProps(value))
    );
    return () => {
      unsub();
    };
  }, [note]);

  useEffect(() => {
    const unsub = listenRecordVoiceParams(recordVoiceParams, (value) =>
      dispatch(recordVoiceParamsActions.setParams(value))
    );
    return () => {
      unsub();
    };
  }, [recordVoiceParams]);

  useEffect(() => {
    const unsub = listenRecordVoiceAssets(recordVoiceAssets.entities, (value) =>
      dispatch(recordVoiceAssetsActions.setAll(value))
    );
    return () => {
      unsub();
    };
  }, [recordVoiceAssets]);

  useEffect(() => {
    dispatch(speedWorkoutsActions.startFetch());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TopPage />} />
        <Route path='/liSan' element={<UserPage user='liSan' />} />
        <Route path='/kouSan' element={<UserPage user='kouSan' />} />
        <Route path='/chinSan' element={<UserPage user='chinSan' />} />
        <Route path='note' element={<NotePage />} />
        <Route path='/mng'>
          <Route index element={<MngPage />} />
          <Route path='note' element={<MngNotePage />} />
          <Route path='speed'>
            <Route path=':workoutId' element={<SpeedWorkoutEditPage />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
