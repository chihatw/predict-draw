import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { speedWorkoutParamsActions } from './0-reducer';

const speedWorkoutParamsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'mngPage/initiate': {
        const speedWorkoutParams =
          await services.api.speedWorkoutParams.fetchSpeedWorkoutParams();
        if (!speedWorkoutParams) return;
        dispatch(speedWorkoutParamsActions.setParams(speedWorkoutParams));
        return;
      }
      case 'speedWorkoutParams/changeTotalRounds': {
        const totalRounds = action.payload as number;
        services.api.speedWorkoutParams.changeTotalRounds(totalRounds);
        return;
      }
      case 'speedWorkoutParams/reset': {
        services.api.speedWorkoutParams.reset();
        return;
      }
      case 'speedWorkoutParams/selectId': {
        const selectedId = action.payload as string;
        services.api.speedWorkoutParams.selectId(selectedId);
        return;
      }
      default:
    }
  };

export default [speedWorkoutParamsMiddleware];
