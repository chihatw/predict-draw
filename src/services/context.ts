import { createContext } from 'react';

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
  kouSanPageState: string;
  showPredictPane: boolean;
  handlePredict: (value: string) => void;
  handleNavigate: (pathname: string) => void;
  handleUpdateDrawn: (value: string) => void;
  handleShowPane: ({
    docId,
    visible,
  }: {
    docId: string;
    visible: boolean;
  }) => void;
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
  kouSanPageState: '',
  showPredictPane: false,
  handleUpdateDrawn: () => {},
  handlePredict: () => {},
  handleNavigate: () => {},
  handleShowPane: () => {},
});

export default AppContext;
