import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'main';
import { USERS } from '../core/1-constants';

export const selectUserPageStates = createSelector(
  [(state: RootState) => state.pageStates.entities],
  (pageStates) => {
    return {
      liSanPageState: pageStates[USERS.liSan]?.state,
      kouSanPageState: pageStates[USERS.kouSan]?.state,
      chinSanPageState: pageStates[USERS.chinSan]?.state,
    };
  }
);
