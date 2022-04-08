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
  updateLiSanPageState: (state: PageState) => void;
  updateKouSanPageState: (state: PageState) => void;
}>({
  liSanPageState: '',
  kouSanPageState: '',
  handleNavigate: () => {},
  updateLiSanPageState: () => {},
  updateKouSanPageState: () => {},
});

export default AppContext;
