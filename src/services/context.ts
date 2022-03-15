import { createContext } from 'react';

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
  liSanPageState: string;
  notesPageState: string;
  note1PitchList: [string, pitchesArray][];
  kouSanPageState: string;
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
  updateLiSanPageState: (state: string) => void;
  updateKouSanPageState: (state: string) => void;
  handleStopBpmCalcTiemr: (value: number) => void;
  handleStartBpmCalcTimer: () => void;
}>({
  drawn: '',
  predict: '',
  yesRatio: 0,
  newGameAt: 0,
  bpmCalcBpm: 0,
  liSanPoints: 0,
  kouSanPoints: 0,
  bpmCalcLabel: INITIAL_BPM_CALC_LABEL,
  showScorePane: false,
  showRatioPane: false,
  notesPageState: '',
  liSanPageState: '',
  note1PitchList: [],
  kouSanPageState: '',
  showPredictPane: false,
  isBpmCalcRunning: false,
  updateDrawn: () => {},
  updatePredict: () => {},
  handleNavigate: () => {},
  updateYesRatio: () => {},
  handleShowPane: () => {},
  updateNewGameAt: () => {},
  updatePitchList: () => {},
  updateNotesPageState: () => {},
  updateLiSanPageState: () => {},
  updateKouSanPageState: () => {},
  handleStopBpmCalcTiemr: () => {},
  handleStartBpmCalcTimer: () => {},
});

export default AppContext;
