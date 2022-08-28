import React, { createContext, useEffect, useReducer } from 'react';
import {
  INITIAL_CUE_WORKOUT_STATE,
  INITIAL_NOTE_STATE,
  INITIAL_RANDOM_WORKOUT_STATE,
  INITIAL_WORKING_MEMORY,
  INITIAL_WORKOUT_PARAMS,
  pages,
  State,
} from './Model';

import AppRoutes from './routes/AppRoutes';
import usePageState from './services/pageState';
import { useWorkoutParams } from './services/workoutParams';
import { useWorkouts } from './services/workout';
import { Action, ActionTypes, reducer } from './Update';
import useNote from './services/note';
import {
  useRandomWorkoutParams,
  useRandomWorkouts,
} from './services/randomWorkout';
import { createAudioContext } from './services/utils';
import { useCueWorkout } from './services/cueWorkout';
import { useWorkingMemoryWorkout } from './services/workingMemoryWorkout';
import { useRhythmList } from './services/rhythmList';

const INITIAL_STATE: State = {
  audioContext: null,
  note: INITIAL_NOTE_STATE,
  workouts: [],
  pageStates: {
    liSan: '',
    kouSan: '',
    chinSan: '',
  },
  cueWorkout: INITIAL_CUE_WORKOUT_STATE,
  workoutParams: INITIAL_WORKOUT_PARAMS,
  randomWorkout: INITIAL_RANDOM_WORKOUT_STATE,
  workingMemory: INITIAL_WORKING_MEMORY,
  workingMemoryAnswerIds: [],
  rhythmList: {
    tapped: [],
    mora: 1,
  },
  blobs: {},
  blobURLs: {},
};

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
  useWorkouts(dispatch);
  usePageState(dispatch);
  useRhythmList(dispatch);
  useCueWorkout(dispatch);
  useWorkoutParams(dispatch);
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
