import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE } from './Model';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/pageState';
import { useWorkoutParams } from './services/workoutParams';
import { useWorkouts } from './services/workout';
import { ActionTypes, reducer } from './Update';
import useNote from './services/note';
import {
  useRandomWorkoutParams,
  useRandomWorkouts,
} from './services/randomWorkout';
import { createAudioContext } from './services/utils';
import { useCueWorkout } from './services/cueWorkout';

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useNote(dispatch);
  useWorkouts(dispatch);
  usePageState(dispatch);
  useCueWorkout(dispatch);
  useWorkoutParams(dispatch);
  useRandomWorkouts(dispatch);
  useRandomWorkoutParams(dispatch);

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

// class AudioContextFactory {
//   create() {
//     const audioContext = new window.AudioContext();
//     const osc = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
//     osc.connect(gainNode);
//     gainNode.connect(audioContext.destination);
//     gainNode.gain.value = 0;
//     osc.start(audioContext.currentTime);
//     osc.stop(audioContext.currentTime + 0.1);
//     return audioContext;
//   }
// }
