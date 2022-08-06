import React, { createContext } from 'react';
import { INITIAL_STATE, pages, State } from '../Model';
import { Action } from '../Update';
import {
  INITIAL_WORKOUT_ROUND,
  INITIAL_WORKOUT_TIME,
  WorkoutRound,
  WorkoutTime,
} from './useWorkoutItems';
import { Workout } from './useWorkouts';

export type Users = {
  liSan: number;
  kouSan: number;
};

export const INITIAL_USERS: Users = { liSan: 0, kouSan: 0 };

const AppContext = createContext<{
  workouts: Workout[];
  workoutId: string;
  workoutRound: WorkoutRound;
  workoutTime: WorkoutTime;
  checkedIndexes: number[];
  state: State;
  dispatch: React.Dispatch<Action> | null;
}>({
  workouts: [],
  workoutId: '',
  workoutRound: INITIAL_WORKOUT_ROUND,
  workoutTime: INITIAL_WORKOUT_TIME,
  checkedIndexes: [],
  state: INITIAL_STATE,
  dispatch: null,
});

export default AppContext;
