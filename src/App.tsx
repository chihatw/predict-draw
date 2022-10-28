import React, { createContext, useEffect, useReducer } from 'react';
import {
  INITIAL_CUE_WORKOUT_STATE,
  INITIAL_NOTE_STATE,
  INITIAL_RANDOM_WORKOUT_STATE,
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

const INITIAL_STATE: State = {
  audioContext: null,
  note: INITIAL_NOTE_STATE,
  speedWorkouts: {},
  pageStates: {
    liSan: '',
    kouSan: '',
    chinSan: '',
  },
  cueWorkout: INITIAL_CUE_WORKOUT_STATE,
  // workoutParams: INITIAL_WORKOUT_PARAMS,
  randomWorkout: INITIAL_RANDOM_WORKOUT_STATE,
  workingMemory: INITIAL_WORKING_MEMORY,
  workingMemoryAnswerIds: [],
  rhythmWorkout: { mora: 1, cueIds: [], cueCount: 0 },
  rhythmWorkoutAnswers: {},
  rhythmList: { tapped: [], mora: 1 },
  kanaCards: { tapped: [], kanas: [] },
  params: {
    kanaWorkout: {
      kanas: [],
      currentIndex: 0,
      answers: {},
    },
    speedWorkout: {
      bpm: 0,
      isRunning: false,
      selectedId: '',
      updatedAt: 0,
      totalRounds: 1,
      checkedIndexes: [],
      currentRound: 1,
    },
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
  useKanaCards(dispatch);
  usePageState(dispatch);
  useRhythmList(dispatch);
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
