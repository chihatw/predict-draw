import React, { createContext, useEffect, useReducer } from 'react';
import { INITIAL_STATE, State } from './Model';

import { Action, ActionTypes, reducer } from './Update';
import AppRoutes from './routes/AppRoutes';
import { useCueWorkout } from './services/cueWorkout/cueWorkout';
import useNote from './services/note';
import usePageState from './services/pageState';
import { useSpeedWorkout } from './services/speedWorkout';
import { createAudioContext } from './services/utils';

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

  useEffect(() => {
    const { audioContext } = state;
    const _createAudioContext = () => {
      const _audioContext = createAudioContext();
      dispatch({ type: ActionTypes.setAudioContext, payload: _audioContext });
      window.removeEventListener('click', _createAudioContext);
    };
    if (!audioContext) {
      window.addEventListener('click', _createAudioContext);
    }
  }, [state.audioContext]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
