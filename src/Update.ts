import { IRecordVoiceParams } from 'application/recordVoiceParms/core/0-interface';
import * as R from 'ramda';
import { State, VoiceProps } from './Model';

export const ActionTypes = {
  setState: 'setState',

  setCueWorkoutCue: 'setCueWorkoutCue',
  setCueWorkoutCards: 'setCueWorkoutCards',
  setRecordVoiceRaw: 'setRecordVoiceRaw',
  setRecordVoiceAssets: 'setRecordVoiceAssets',
  setRecordVoiceParams: 'setRecordVoiceParams',
  setRecordVoiceLogs: 'setRecordVoiceLogs',
};

export type Action = {
  type: string;
  payload?:
    | State
    | string
    | string[]
    | number
    | number[]
    | { [index: number]: string[] }
    | { [imagePath: string]: string }
    | { imagePath: string; blobURL: string }
    | {
        blobs: { [workoutId: string]: Blob | null };
        audioBuffers: { [downloadURL: string]: AudioBuffer };
      }
    | VoiceProps
    | { [id: string]: VoiceProps }
    | IRecordVoiceParams
    | { selected: string };
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.setState: {
      return payload as State;
    }

    // recordVoice
    case ActionTypes.setRecordVoiceRaw: {
      const recordVoiceRaw = payload as VoiceProps;
      return R.assocPath<VoiceProps, State>(
        ['recordVoice', 'raw'],
        recordVoiceRaw
      )(state);
    }
    case ActionTypes.setRecordVoiceAssets: {
      const recordVoiceAssets = payload as { [id: string]: VoiceProps };
      return R.assocPath<{ [id: string]: VoiceProps }, State>(
        ['recordVoice', 'assets'],
        recordVoiceAssets
      )(state);
    }
    case ActionTypes.setRecordVoiceParams: {
      const recordVoiceParams = payload as IRecordVoiceParams;
      return R.assocPath<IRecordVoiceParams, State>(
        ['recordVoice', 'params'],
        recordVoiceParams
      )(state);
    }
    case ActionTypes.setRecordVoiceLogs: {
      const recordVoiceLogs = payload as { selected: string };
      return R.assocPath<{ selected: string }, State>(
        ['recordVoice', 'logs'],
        recordVoiceLogs
      )(state);
    }
    default:
      return R.compose(R.identity)(state);
  }
};
