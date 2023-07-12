import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { IRecordVoiceParams } from 'application/recordVoiceParams/core/0-interface';
import {
  RAW_PATH,
  RECORD_VOICE_STORAGE_PATH,
} from 'application/recordVoiceParams/core/1-constants';
import { recordedAudioActions } from 'application/recordedAudio/framework/0-reducer';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';
import { audioBuffersActions } from './0-reducer';

const audioMiddleWare =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'audioBuffers/getAudioBufferStart': {
        const path = action.payload as string;
        const audioBuffers = (getState() as RootState).audioBuffers.entities;

        const paths = Object.keys(audioBuffers);

        // path がすでに存在すれば、終了
        if (paths.includes(path)) break;

        const gotAudioBuffer =
          await services.api.audioBuffers.fetchStorageAudioBuffer(path);
        if (!gotAudioBuffer) return;
        dispatch(
          audioBuffersActions.mergeAudioBuffers([
            {
              id: path,
              audioBuffer: gotAudioBuffer || undefined,
            },
          ])
        );

        return;
      }
      case 'audioBuffers/getAudioBuffersStart': {
        const paths = action.payload as string[];
        const audioBuffers = (getState() as RootState).audioBuffers.entities;

        const fetchedPaths = Object.keys(audioBuffers);

        // audioBuffers の取得
        const gotAudioBuffers: {
          id: string;
          audioBuffer: AudioBuffer | undefined;
        }[] = [];
        await Promise.all(
          paths.map(async (path) => {
            // path がすでに存在すれば、スキップ
            if (!fetchedPaths.includes(path)) {
              const gotAudioBuffer =
                await services.api.audioBuffers.fetchStorageAudioBuffer(path);
              gotAudioBuffers.push({
                id: path,
                audioBuffer: gotAudioBuffer,
              });
            }
          })
        );

        dispatch(audioBuffersActions.mergeAudioBuffers(gotAudioBuffers));
        return;
      }
      case 'audioBuffers/saveAudioBuffer': {
        const path = action.payload.id as string;
        const recordedBlob = (getState() as RootState).recordedAudio.blob;

        if (!recordedBlob) return;

        await services.api.audioBuffers.uploadStorageByPath(recordedBlob, path);
        dispatch(recordedAudioActions.resetRecordedAudio());
        return;
      }
      case 'audioBuffers/removeAudioBuffer': {
        const path = action.payload as string;
        await services.api.audioBuffers.deleteStorageByPath(path);
        return;
      }
      // audioBuffers に追加、storage に upload
      case 'recordedAudio/setRecordedAudio': {
        const { recordedAudioBuffer, recordedBlob } = action.payload as {
          recordedBlob: Blob;
          recordedAudioBuffer: AudioBuffer;
        };
        if (!recordedBlob || !recordedAudioBuffer) return;
        const path = RECORD_VOICE_STORAGE_PATH + 'raw';
        await services.api.audioBuffers.uploadStorageByPath(recordedBlob, path);
        dispatch(
          audioBuffersActions.saveAudioBuffer({
            id: path,
            audioBuffer: recordedAudioBuffer,
          })
        );
        return;
      }
      case 'recordVoiceParams/setParams': {
        const params = action.payload as IRecordVoiceParams;
        if (!params.hasRaw) {
          dispatch(audioBuffersActions.removeAudioBuffer(RAW_PATH));
          return;
        }
        dispatch(audioBuffersActions.getAudioBufferStart(RAW_PATH));
        return;
      }
      default:
    }
  };

export default [audioMiddleWare];
