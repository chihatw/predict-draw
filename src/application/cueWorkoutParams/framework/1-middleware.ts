import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
const cueWorkoutParamsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'cueWorkoutParamas/reset': {
        services.api.cueWorkoutParams.reset();
        return;
      }
      default:
    }
  };

export default [cueWorkoutParamsMiddleware];
