import React, { createContext, useEffect, useReducer } from 'react';
import {
  INITIAL_CUE_WORKOUT_STATE,
  INITIAL_NOTE_STATE,
  INITIAL_RANDOM_WORKOUT_STATE,
  INITIAL_STATE,
  INITIAL_WORKING_MEMORY,
  State,
} from './Model';

import AppRoutes from './routes/AppRoutes';
import usePageState from './services/pageState';
import { Action, ActionTypes, reducer } from './Update';
import useNote from './services/note';
import {
  useRandomWorkoutParams,
  useRandomWorkouts,
} from './services/randomWorkout';
import { createAudioContext } from './services/utils';
import { useCueWorkout } from './services/cueWorkout/cueWorkout';
import { useWorkingMemoryWorkout } from './services/workingMemoryWorkout';
import { useRhythmList } from './services/rhythmList';
import { useRhythmWorkout } from './services/rhythmWorkout';
import { useKanaCards } from './services/kanaCard';
import { useSpeedWorkout } from './services/speedWorkout';
import { usePitchList } from './services/pitchList';

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
  useKanaCards(dispatch);
  usePageState(dispatch);
  useRhythmList(dispatch);
  usePitchList(dispatch);
  useCueWorkout(dispatch);
  useSpeedWorkout(dispatch);
  useRhythmWorkout(dispatch);
  useRandomWorkouts(dispatch);
  useRandomWorkoutParams(dispatch);
  useWorkingMemoryWorkout(dispatch);

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
