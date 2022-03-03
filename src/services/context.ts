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
  user: string;
  cards: Cards;
  predict: string;
  liSanPoints: number;
  kouSanPoints: number;
  handleLogout: () => void;
  handlePredict: (value: string) => void;
  handleSetUser: (value: string) => void;
  handleNavigate: (pathname: string) => void;
  handleResult: (value: string) => void;
}>({
  user: '',
  cards: INITIAL_CARDS,
  predict: '',
  liSanPoints: 0,
  kouSanPoints: 0,
  handleLogout: () => {},
  handleResult: () => {},
  handlePredict: () => {},
  handleSetUser: () => {},
  handleNavigate: () => {},
});

export default AppContext;
