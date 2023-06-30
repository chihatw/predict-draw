import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { IPageState } from '../core/0-interface';
import { pageStatesActins } from './0-reducer';

const pageStatesMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'mngPage/initiate': {
        const pageStates = await services.api.pageStates.fetchPageStates();
        dispatch(pageStatesActins.upsertPageStates(pageStates));
        break;
      }
      case 'pageStates/changePageState': {
        const { id, state } = action.payload as IPageState;
        await services.api.pageStates.changePageState(id, state);
        break;
      }
      default:
    }
  };

export default [pageStatesMiddleware];
