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

  bpmTrackBpm: number;
  bpmTrackType: string;
  bpmTrackOffsets: number[];
  syncopationRatio: number;
  bpmTrackBpmPitchesArray: string[][][];
  updateBpmTrackBpm: (value: number) => void;
  updateBpmTrackType: (value: string) => void;
  updateBpmTrackOffsets: (value: number[]) => void;
  updateBpmPitchesArray: (value: string[][][]) => void;
  updateSyncopationRatio: (value: number) => void;
}>({
  bpmTrackBpm: 0,
  bpmTrackType: 'syllable',
  liSanPageState: '',
  kouSanPageState: '',
  bpmTrackOffsets: [],
  syncopationRatio: 100,
  bpmTrackBpmPitchesArray: [],
  handleNavigate: () => {},
  updateBpmTrackBpm: () => {},
  updateBpmTrackType: () => {},
  updateLiSanPageState: () => {},
  updateBpmTrackOffsets: () => {},
  updateBpmPitchesArray: () => {},
  updateKouSanPageState: () => {},
  updateSyncopationRatio: () => {},
});

export default AppContext;
