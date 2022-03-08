import { createContext } from 'react';

export type Users = {
  liSan: number;
  kouSan: number;
};

export const INITIAL_USERS: Users = { liSan: 0, kouSan: 0 };

const AppContext = createContext<{
  predict: string;
  yesRatio: number;
  newGameAt: number;
  liSanPoints: number;
  kouSanPoints: number;
  liSanPageState: string;
  kouSanPageState: string;
  showScorePane: boolean;
  showRatioPane: boolean;
  showPredictPane: boolean;
  handlePredict: (value: string) => void;
  handleNavigate: (pathname: string) => void;
  handleResult: (value: string) => void;
  handleShowPane: ({
    docId,
    visible,
  }: {
    docId: string;
    visible: boolean;
  }) => void;
}>({
  predict: '',
  yesRatio: 0,
  newGameAt: 0,
  liSanPoints: 0,
  kouSanPoints: 0,
  liSanPageState: '',
  kouSanPageState: '',
  showScorePane: false,
  showRatioPane: false,
  showPredictPane: false,
  handleResult: () => {},
  handlePredict: () => {},
  handleNavigate: () => {},
  handleShowPane: () => {},
});

export default AppContext;
