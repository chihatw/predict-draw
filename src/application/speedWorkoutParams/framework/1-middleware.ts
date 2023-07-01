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
      case 'speedWOrkoutParams/startFetch':
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
      case 'speedWorkoutParams/startWorkout': {
        services.api.speedWorkoutParams.startWorkout();
        return;
      }
      case 'speedWorkoutParams/stopWorkout': {
        const bpm = action.payload as number;
        services.api.speedWorkoutParams.stopWorkout(bpm);
        return;
      }
      case 'speedWorkoutParams/checkIndex': {
        const index = action.payload as number;
        services.api.speedWorkoutParams.checkIndex(index);
        return;
      }
      case 'speedWorkoutParams/nextRound': {
        services.api.speedWorkoutParams.nextRound();
      }
      default:
    }
  };

export default [speedWorkoutParamsMiddleware];
