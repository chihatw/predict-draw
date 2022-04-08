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
  drawn: 'yes' | 'no' | '';
  predict: string;
  yesRatio: number;
  newGameAt: number;

  liSanPoints: number;
  kouSanPoints: number;

  showScorePane: boolean;
  showRatioPane: boolean;
  liSanPageState: PageState;
  notesPageState: string;
  note1PitchList: [string, pitchesArray][];
  kouSanPageState: PageState;
  showPredictPane: boolean;

  updateDrawn: (value: string) => void;
  updatePredict: (value: string) => void;
  updateYesRatio: (ratio: number) => void;
  handleNavigate: (pathname: string) => void;
  handleShowPane: ({
    docId,
    visible,
  }: {
    docId: string;
    visible: boolean;
  }) => void;

  updateNewGameAt: () => void;
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
  drawn: '',
  predict: '',
  yesRatio: 0,
  newGameAt: 0,
  liSanPoints: 0,
  bpmTrackBpm: 0,
  kouSanPoints: 0,
  bpmTrackType: 'syllable',
  showScorePane: false,
  showRatioPane: false,
  notesPageState: '',
  liSanPageState: '',
  note1PitchList: [],
  kouSanPageState: '',
  bpmTrackOffsets: [],
  showPredictPane: false,
  syncopationRatio: 100,
  bpmTrackBpmPitchesArray: [],
  updateDrawn: () => {},
  updatePredict: () => {},
  handleNavigate: () => {},
  updateYesRatio: () => {},
  handleShowPane: () => {},
  updateNewGameAt: () => {},
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
