import React, { createContext, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { INITIAL_STATE, State } from '../Model';

import { IPageState } from 'application/pageStates/core/0-interface';
import { pageStatesActions } from 'application/pageStates/framework/0-reducer';
import { listenPageStates } from 'application/pageStates/infrastructure/api';
import { ISpeedWorkoutParams } from 'application/speedWorkoutParams/core/0-interface';
import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import { listenSpeedWorkoutParams } from 'application/speedWorkoutParams/infrastracture/api';
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
  const speedWorkoutParams = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );
  const pageStates = useSelector(
    (state: RootState) => state.pageStates.entities
  );

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useNote(dispatch);
  useCueWorkout(dispatch);

  useEffect(() => {
    const unsub = listenPageStates(pageStates, (pageStates: IPageState[]) =>
      _dispatch(pageStatesActions.upsertPageStates(pageStates))
    );
    return () => {
      unsub();
    };
  }, [pageStates]);

  useEffect(() => {
    const unsub = listenSpeedWorkoutParams(
      speedWorkoutParams,
      (speedWorkoutParams: ISpeedWorkoutParams) =>
        _dispatch(speedWorkoutParamsActions.setParams(speedWorkoutParams))
    );
    return () => {
      unsub();
    };
  }, [speedWorkoutParams]);

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
