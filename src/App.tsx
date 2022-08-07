import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE } from './Model';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/pageState';
import { useWorkoutParams } from './services/workoutParams';
import { useWorkouts } from './services/workout';
import { reducer } from './Update';

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  usePageState(dispatch);
  useWorkouts(dispatch);
  useWorkoutParams(dispatch);

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
