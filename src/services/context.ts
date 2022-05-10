import { createContext } from 'react';
import {
  INITIAL_WORKOUT_ROUND,
  INITIAL_WORKOUT_TIME,
  WorkoutRound,
  WorkoutTime,
} from './useWorkoutItems';
import { Workout } from './useWorkouts';

export type PageState =
  | 'greeting'
  | 'bpmCalc'
  | 'bpmTrack'
  | 'predict'
  | 'draw'
  | 'talkingToLiSan'
  | 'talkingToKouSan'
  | 'readTimePractice'
  | 'readTimePerformance'
  | 'writeTimePerformance'
  | 'workoutCue'
  | 'workoutRead'
  | '';

export type Users = {
  liSan: number;
  kouSan: number;
};

export const INITIAL_USERS: Users = { liSan: 0, kouSan: 0 };

const AppContext = createContext<{
  liSanPageState: PageState;
  kouSanPageState: PageState;
  workouts: Workout[];
  workoutId: string;
  workoutRound: WorkoutRound;
  workoutTime: WorkoutTime;
  checkedIndexes: number[];
  handleNavigate: (pathname: string) => void;
}>({
  liSanPageState: '',
  kouSanPageState: '',
  workouts: [],
  workoutId: '',
  workoutRound: INITIAL_WORKOUT_ROUND,
  workoutTime: INITIAL_WORKOUT_TIME,
  checkedIndexes: [],
  handleNavigate: () => {},
});

export default AppContext;
