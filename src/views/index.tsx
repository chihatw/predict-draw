import React, { createContext, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { INITIAL_STATE, State } from '../Model';

import { cuePatternActions } from 'application/cuePattern/framework/0-reducer';
import { cuePatternParamsActions } from 'application/cuePatternParams/framework/0-reducer';
import { cueWorkoutCueActions } from 'application/cueWorkoutCue/framework/0-reducer';
import { listenCueWorkoutCue } from 'application/cueWorkoutCue/infrastructure/api';
import { cueWorkoutParamsActions } from 'application/cueWorkoutParams/framework/0-reducer';
import { listenCueWorkoutParams } from 'application/cueWorkoutParams/infrastructure/api';
import { pageStatesActions } from 'application/pageStates/framework/0-reducer';
import { listenPageStates } from 'application/pageStates/infrastructure/api';
import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import { listenSpeedWorkoutParams } from 'application/speedWorkoutParams/infrastracture/api';
import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { RootState } from 'main';
import { Action, reducer } from '../Update';
import { useCueWorkout } from '../services/cueWorkout/cueWorkout';
import useNote from '../services/note';
import MngPage from './pages/MngPage';
import MngNotePage from './pages/Note/MngNotePage';
import NotePage from './pages/Note/NotePage';
import SpeedWorkoutEditPage from './pages/SpeedWorkoutEditPage';
import TopPage from './pages/TopPage';
import UserPage from './pages/UserPage';

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

function App() {
  const _dispatch = useDispatch();
  const pageStates = useSelector(
    (state: RootState) => state.pageStates.entities
  );
  const {
    speedWorkoutParams,
    cueWorkoutParams,
    cuePatternParams,
    cuePattern,
    cueWorkoutCue,
  } = useSelector((state: RootState) => state);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useNote(dispatch);
  useCueWorkout(dispatch);

  useEffect(() => {
    const unsub = listenPageStates(pageStates, (value) =>
      _dispatch(pageStatesActions.upsertPageStates(value))
    );
    return () => {
      unsub();
    };
  }, [pageStates]);

  useEffect(() => {
    const unsub = listenSpeedWorkoutParams(speedWorkoutParams, (value) =>
      _dispatch(speedWorkoutParamsActions.setParams(value))
    );
    return () => {
      unsub();
    };
  }, [speedWorkoutParams]);

  useEffect(() => {
    const unsub = listenCueWorkoutParams(
      cueWorkoutParams,
      cuePatternParams,
      (value) => _dispatch(cueWorkoutParamsActions.setProps(value)),
      (value) => _dispatch(cuePatternParamsActions.setProps(value))
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = listenCueWorkoutCue(
      cueWorkoutCue,
      cuePattern,
      (value) => _dispatch(cueWorkoutCueActions.setProps(value)),
      (value) => _dispatch(cuePatternActions.setProps(value))
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    _dispatch(speedWorkoutsActions.startFetch());
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
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
    </AppContext.Provider>
  );
}

export default App;
