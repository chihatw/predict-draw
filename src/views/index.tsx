import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { INITIAL_STATE, State } from '../Model';

import { Action, reducer } from '../Update';
import { useCueWorkout } from '../services/cueWorkout/cueWorkout';
import useNote from '../services/note';
import usePageState from '../services/pageState';
import { useSpeedWorkout } from '../services/speedWorkout';
import MngPage from './pages/MngPage';
import MngNotePage from './pages/Note/MngNotePage';
import NotePage from './pages/Note/NotePage';
import SpeedWorkoutEditPage from './pages/SpeedWorkoutEditPage';
import TopPage from './pages/TopPage';
import KouSanPage from './pages/User/KouSanPage';
import LisanPage from './pages/User/LiSanPage';
import ChinSanPage from './pages/User/UserPane/ChinSanPage';

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useNote(dispatch);
  usePageState(dispatch);
  useCueWorkout(dispatch);
  useSpeedWorkout(dispatch);

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
          <Route path='/liSan' element={<LisanPage />} />
          <Route path='/kouSan' element={<KouSanPage />} />
          <Route path='/chinSan' element={<ChinSanPage />} />
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
