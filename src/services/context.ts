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

export type pitchesArray = string[][][];

export type Users = {
  liSan: number;
  kouSan: number;
};

export const INITIAL_USERS: Users = { liSan: 0, kouSan: 0 };

const AppContext = createContext<{
  liSanPageState: PageState;
  notesPageState: string;
  note1PitchList: [string, pitchesArray][];
  kouSanPageState: PageState;
  handleNavigate: (pathname: string) => void;
  updatePitchList: ({
    note,
    pitchList,
  }: {
    note: 'note1' | 'note2';
    pitchList: [string, pitchesArray][];
  }) => void;
  updateNotesPageState: (state: string) => void;
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
  notesPageState: '',
  liSanPageState: '',
  note1PitchList: [],
  kouSanPageState: '',
  bpmTrackOffsets: [],
  syncopationRatio: 100,
  bpmTrackBpmPitchesArray: [],
  handleNavigate: () => {},
  updatePitchList: () => {},
  updateBpmTrackBpm: () => {},
  updateBpmTrackType: () => {},
  updateNotesPageState: () => {},
  updateLiSanPageState: () => {},
  updateBpmTrackOffsets: () => {},
  updateBpmPitchesArray: () => {},
  updateKouSanPageState: () => {},
  updateSyncopationRatio: () => {},
});

export default AppContext;
