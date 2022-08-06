import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE } from './Model';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/pageState';
import { useWorkoutItems } from './services/useWorkoutItems';
import { useWorkouts } from './services/useWorkouts';
import { reducer } from './Update';

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  usePageState(dispatch);

  const { workoutId, workoutRound, workoutTime, checkedIndexes } =
    useWorkoutItems();
  const { workouts } = useWorkouts();
  return (
    <AppContext.Provider
      value={{
        workouts,
        workoutId,
        workoutRound,
        workoutTime,
        checkedIndexes,
        state,
        dispatch,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
