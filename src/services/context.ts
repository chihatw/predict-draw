import React, { createContext } from 'react';
import { INITIAL_STATE, State } from '../Model';
import { Action } from '../Update';

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action> | null;
}>({
  state: INITIAL_STATE,
  dispatch: null,
});

export default AppContext;
