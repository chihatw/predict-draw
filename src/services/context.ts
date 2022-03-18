import { createContext } from 'react';

export type PageState =
  | 'greeting'
  | 'bpmCalc'
  | 'bpmTrack'
  | 'predict'
  | 'draw'
  | 'talkingToLiSan'
  | 'talkingToKouSan'
  | '';

export type BpmCalcLabel = { label: string; syllableCount: number };

export const INITIAL_BPM_CALC_LABEL: BpmCalcLabel = {
  label: '',
  syllableCount: 0,
};

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
  bpmCalcBpm: number;
  liSanPoints: number;
  kouSanPoints: number;
  bpmCalcLabel: BpmCalcLabel;
  showScorePane: boolean;
  showRatioPane: boolean;
  liSanPageState: PageState;
  notesPageState: string;
  note1PitchList: [string, pitchesArray][];
  kouSanPageState: PageState;
  showPredictPane: boolean;
  isBpmCalcRunning: boolean;
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
  handleStopBpmCalcTiemr: (value: number) => void;
  handleStartBpmCalcTimer: () => void;
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
  bpmCalcBpm: 0,
  liSanPoints: 0,
  bpmTrackBpm: 0,
  kouSanPoints: 0,
  bpmCalcLabel: INITIAL_BPM_CALC_LABEL,
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
  isBpmCalcRunning: false,
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
  handleStopBpmCalcTiemr: () => {},
  handleStartBpmCalcTimer: () => {},
});

export default AppContext;
