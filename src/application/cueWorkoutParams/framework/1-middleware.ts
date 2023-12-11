import { Services } from '@/infrastructure/services';
import { AnyAction, Middleware } from '@reduxjs/toolkit';

import { ICuePatternParams } from '@/application/cuePatternParams/core/0-interface';
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
      case 'cueWorkoutParamas/start': {
        services.api.cueWorkoutParams.start();
        return;
      }
      case 'cueWorkoutParamas/next': {
        services.api.cueWorkoutParams.next();
        return;
      }
      case 'cueWorkoutParamas/stop': {
        services.api.cueWorkoutParams.stop();
        return;
      }
      case 'cueWorkoutParamas/setColors': {
        const colors = action.payload as string[];
        services.api.cueWorkoutParams.setColors(colors);
        return;
      }
      case 'cueWorkoutParamas/setTime': {
        const time = action.payload as number;
        services.api.cueWorkoutParams.setTime(time);
        return;
      }
      case 'cuePatternParams/updateProps': {
        const patternParams = action.payload as ICuePatternParams;
        services.api.cueWorkoutParams.updatePatternParams(patternParams);
      }
      default:
    }
  };

export default [cueWorkoutParamsMiddleware];
