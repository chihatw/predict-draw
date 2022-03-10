import { createContext } from 'react';

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
  liSanPageState: string;
  notesPageState: string;
  note1PitchList: [string, pitchesArray][];
  kouSanPageState: string;
  showPredictPane: boolean;
  updatePredict: (value: string) => void;
  handleNavigate: (pathname: string) => void;
  updateDrawn: (value: string) => void;
  handleShowPane: ({
    docId,
    visible,
  }: {
    docId: string;
    visible: boolean;
  }) => void;

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
}>({
  drawn: '',
  predict: '',
  yesRatio: 0,
  newGameAt: 0,
  liSanPoints: 0,
  kouSanPoints: 0,
  showScorePane: false,
  showRatioPane: false,
  notesPageState: '',
  liSanPageState: '',
  note1PitchList: [],
  kouSanPageState: '',
  showPredictPane: false,
  updatePredict: () => {},
  handleNavigate: () => {},
  handleShowPane: () => {},
  updateDrawn: () => {},
  updatePitchList: () => {},
  updateNotesPageState: () => {},
  updateLiSanPageState: () => {},
  updateKouSanPageState: () => {},
});

export default AppContext;
