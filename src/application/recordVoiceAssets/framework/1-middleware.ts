import { audioBuffersActions } from "@/application/audioBuffers/framework/0-reducer";
import {
  RAW_PATH,
  RECORD_VOICE_STORAGE_PATH,
} from "@/application/recordVoiceParams/core/1-constants";
import { Services } from "@/infrastructure/services";
import { RootState } from "@/main";
import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { IRecordVoiceAsset } from "../core/0-interface";

const recordVoiceAssetsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case "recordVoiceAssets/setAll": {
        const assets = action.payload as IRecordVoiceAsset[];
        const paths = assets.map(
          (asset) => RECORD_VOICE_STORAGE_PATH + asset.id,
        );
        dispatch(audioBuffersActions.getAudioBuffersStart(paths));
        return;
      }
      case "recordVoiceAssets/changePitchStr": {
        const { id, pitchStr } = action.payload as {
          id: string;
          pitchStr: string;
        };
        services.api.recordVoiceAssets.changePitchStr(id, pitchStr);
        return;
      }
      case "recordVoiceAssets/changeStartAt": {
        const { id, startAt } = action.payload as {
          id: string;
          startAt: number;
        };
        services.api.recordVoiceAssets.changeStartAt(id, startAt);
        return;
      }
      case "recordVoiceAssets/changeStopAt": {
        const { id, stopAt } = action.payload as {
          id: string;
          stopAt: number;
        };
        services.api.recordVoiceAssets.changeStopAt(id, stopAt);
        return;
      }
      case "recordVoiceAssets/removeOne": {
        const id = action.payload as string;
        const path = RECORD_VOICE_STORAGE_PATH + id;
        services.api.recordVoiceAssets.deleteOne(id);
        dispatch(audioBuffersActions.removeAudioBuffer(path));
        return;
      }
      case "recordVoiceAssets/addAsset": {
        const asset = action.payload as IRecordVoiceAsset;
        const rawBlob = (getState() as RootState).recordedAudio.blob;
        const audioBuffer = (getState() as RootState).audioBuffers.entities[
          RAW_PATH
        ];
        const path = RECORD_VOICE_STORAGE_PATH + asset.id;
        if (!rawBlob || !audioBuffer || !audioBuffer.audioBuffer) return;
        dispatch(
          audioBuffersActions.saveAudioBuffer({
            id: path,
            audioBuffer: audioBuffer.audioBuffer,
          }),
        );
        services.api.recordVoiceAssets.addOne(asset);

        return;
      }
      default:
    }
  };

export default [recordVoiceAssetsMiddleware];
