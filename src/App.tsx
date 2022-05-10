import React from 'react';
import { useNavigate } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import AppContext from './services/context';
import usePageState from './services/usePageState';
import { useWorkoutItems } from './services/useWorkoutItems';
import { useWorkouts } from './services/useWorkouts';

function App() {
  const { liSanPageState, kouSanPageState } = usePageState();
  const navigate = useNavigate();

  const handleNavigate = (pathname: string) => {
    navigate(pathname);
  };

  const { workoutId, workoutRound, workoutTime, checkedIndexes } =
    useWorkoutItems();
  const { workouts } = useWorkouts();
  return (
    <AppContext.Provider
      value={{
        liSanPageState,
        kouSanPageState,
        workouts,
        workoutId,
        workoutRound,
        workoutTime,
        checkedIndexes,
        handleNavigate,
      }}
    >
      <AppRoutes />
    </AppContext.Provider>
  );
}

export default App;
