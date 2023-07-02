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
      default:
    }
  };

export default [cueWorkoutParamsMiddleware];
