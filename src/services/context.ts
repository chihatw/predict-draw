import { createContext } from 'react';

export type Cards = {
  yes: number;
  no: number;
};

export const INITIAL_CARDS: Cards = { yes: 0, no: 0 };

export type Users = {
  liSan: number;
  kouSan: number;
};

export const INITIAL_USERS: Users = { liSan: 0, kouSan: 0 };

const AppContext = createContext<{
  cards: Cards;
  predict: string;
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
  cards: INITIAL_CARDS,
  predict: '',
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
