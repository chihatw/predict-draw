import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';
import { IPageState } from '../core/0-interface';
import { pageStatesActions } from './0-reducer';

const pageStatesMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'pageStates/startFetch':
      case 'mngPage/initiate': {
        const pageStateIds = (getState() as RootState).pageStates.ids;
        if (!!pageStateIds.length) return;
        const pageStates = await services.api.pageStates.fetchPageStates();
        dispatch(pageStatesActions.upsertPageStates(pageStates));
        return;
      }
      case 'pageStates/changePageState': {
        const { id, state } = action.payload as IPageState;
        await services.api.pageStates.changePageState(id, state);
        return;
      }
      default:
    }
  };

export default [pageStatesMiddleware];
