import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE } from './Model';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/pageState';
import { useWorkoutParams } from './services/workoutParams';
import { useWorkouts } from './services/workout';
import { reducer } from './Update';
import useNote from './services/note';
import { useRandomWorkouts } from './services/randomWorkout';

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useNote(dispatch);
  useWorkouts(dispatch);
  usePageState(dispatch);
  useWorkoutParams(dispatch);
  useRandomWorkouts(dispatch);

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
