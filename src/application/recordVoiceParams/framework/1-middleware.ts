import { Services } from '@/infrastructure/services';
import { AnyAction, Middleware } from '@reduxjs/toolkit';

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
      case 'recordVoiceParams/changeRecordedPitchStr': {
        const recordedPitchStr = action.payload as string;
        services.api.recordVoiceParams.changeRecordedPitchStr(recordedPitchStr);
        return;
      }
      case 'recordVoiceParams/changeHasRaw': {
        const hasRaw = action.payload as boolean;
        services.api.recordVoiceParams.changeHasRaw(hasRaw);
        return;
      }
      default:
    }
  };

export default [recordVoiceParamsMiddleware];
