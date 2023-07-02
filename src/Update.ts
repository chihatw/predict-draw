import * as R from 'ramda';
import {
  CueWorkoutCard,
  CueWorkoutCue,
  NoteState,
  RecordVoiceParams,
  State,
  VoiceProps,
} from './Model';

export const ActionTypes = {
  setState: 'setState',
  setNoteState: 'setNoteState',
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
    | NoteState
    | CueWorkoutCue
    | { [index: number]: string[] }
    | { [id: string]: CueWorkoutCard }
    | { [imagePath: string]: string }
    | { imagePath: string; blobURL: string }
    | {
        blobs: { [workoutId: string]: Blob | null };
        audioBuffers: { [downloadURL: string]: AudioBuffer };
      }
    | VoiceProps
    | { [id: string]: VoiceProps }
    | RecordVoiceParams
    | { selected: string };
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.setState: {
      return payload as State;
    }

    case ActionTypes.setCueWorkoutCards: {
      const cards = payload as { [id: string]: CueWorkoutCard };
      return R.compose(
        R.assocPath<{ [id: string]: CueWorkoutCard }, State>(
          ['cueWorkout', 'cards'],
          cards
        )
      )(state);
    }
    case ActionTypes.setCueWorkoutCue: {
      const cue = payload as CueWorkoutCue;
      return R.compose(
        R.assocPath<CueWorkoutCue, State>(['cueWorkout', 'cue'], cue)
      )(state);
    }

    case ActionTypes.setNoteState: {
      const noteState = payload as NoteState;
      return R.compose(R.assocPath<NoteState, State>(['note'], noteState))(
        state
      );
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
      const recordVoiceParams = payload as RecordVoiceParams;
      return R.assocPath<RecordVoiceParams, State>(
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
