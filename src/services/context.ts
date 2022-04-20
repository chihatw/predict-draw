import { createContext } from 'react';

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
  | 'workoutItems'
  | 'workoutItemsPlayer'
  | '';

export type Users = {
  liSan: number;
  kouSan: number;
};

export const INITIAL_USERS: Users = { liSan: 0, kouSan: 0 };

const AppContext = createContext<{
  liSanPageState: PageState;
  kouSanPageState: PageState;
  handleNavigate: (pathname: string) => void;
}>({
  liSanPageState: '',
  kouSanPageState: '',
  handleNavigate: () => {},
});

export default AppContext;
