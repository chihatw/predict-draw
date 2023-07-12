import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';

const recordVoiceParamsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordVoiceParams/changeRawPitchStr': {
        const rawPitchStr = action.payload as string;
        services.api.recordVoiceParams.changeRawPitchStr(rawPitchStr);
        return;
      }

      default:
    }
  };

export default [recordVoiceParamsMiddleware];
