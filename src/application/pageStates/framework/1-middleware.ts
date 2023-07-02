import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { IPageState } from '../core/0-interface';

const pageStatesMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'pageStates/changePageState': {
        const { id, state } = action.payload as IPageState;
        await services.api.pageStates.changePageState(id, state);
        return;
      }
      default:
    }
  };

export default [pageStatesMiddleware];
