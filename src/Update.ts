import * as R from 'ramda';
import {
  CueWorkoutCard,
  CueWorkoutCue,
  CueWorkoutParams,
  KanaWorkoutParams,
  NoteState,
  PitchInput,
  PitchInputLogs,
  PitchListState,
  PitchWorkout,
  RandomWorkout,
  RandomWorkoutParams,
  RecordVoiceParams,
  RhythmListState,
  RhythmWorkout,
  SpeedWorkout,
  SpeedWorkoutParams,
  State,
  VoiceProps,
  WorkingMemory,
} from './Model';

export const ActionTypes = {
  setState: 'setState',

  setPitchList: 'setPitchList',
  setNoteState: 'setNoteState',
  setPageState: 'setPageState',
  setAudioContext: 'setAudioContext',
  setSpeedWorkouts: 'setSpeedWorkouts',
  setCueWorkoutCue: 'setCueWorkoutCue',
  setCueWorkoutCards: 'setCueWorkoutCards',
  setCueWorkoutParams: 'setCueWorkoutParams',
  setRecordVoiceRaw: 'setRecordVoiceRaw',
  setRecordVoiceAssets: 'setRecordVoiceAssets',
  setRecordVoiceParams: 'setRecordVoiceParams',
  setRecordVoiceLogs: 'setRecordVoiceLogs',
  setSpeedWorkoutParams: 'setSpeedWorkoutParams',
};

export type Action = {
  type: string;
  payload?:
    | State
    | string
    | string[]
    | number
    | number[]
    | SpeedWorkout
    | { [id: string]: SpeedWorkout }
    | NoteState
    | RandomWorkout
    | AudioContext
    | CueWorkoutCue
    | CueWorkoutParams
    | RhythmListState
    | PitchListState
    | RhythmWorkout
    | PitchInput
    | PitchInputLogs
    | PitchWorkout
    | KanaWorkoutParams
    | SpeedWorkoutParams
    | { [index: number]: string[] }
    | { user: string; pageState: string }
    | { workingMemory: WorkingMemory; audioBuffer: AudioBuffer | null }
    | { [id: string]: CueWorkoutCard }
    | { [imagePath: string]: string }
    | { workout: RandomWorkout; blob: Blob }
    | { imagePath: string; blobURL: string }
    | { params: RandomWorkoutParams; workoutId: string }
    | {
        totalRounds: number;
        currentRound: number;
      }
    | {
        time: number;
        bpm: number;
        isRunning: boolean;
      }
    | {
        blobs: { [workoutId: string]: Blob | null };
        audioBuffers: { [downloadURL: string]: AudioBuffer };
        randomWorkouts: { [workoutId: string]: RandomWorkout };
      }
    // RecordVoice
    | VoiceProps
    | { [id: string]: VoiceProps }
    | RecordVoiceParams
    | { selected: string };
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.setSpeedWorkoutParams: {
      const params = payload as SpeedWorkoutParams;
      return R.assocPath<SpeedWorkoutParams, State>(
        ['params', 'speedWorkout'],
        params
      )(state);
    }
    case ActionTypes.setPitchList: {
      const pitchList = payload as PitchListState;
      return R.assocPath<PitchListState, State>(
        ['pitchList'],
        pitchList
      )(state);
    }
    case ActionTypes.setState: {
      return payload as State;
    }
    case ActionTypes.setPageState: {
      const { user, pageState } = payload as {
        user: string;
        pageState: string;
      };
      return R.assocPath<string, State>(['pageStates', user], pageState)(state);
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
    case ActionTypes.setCueWorkoutParams: {
      const params = payload as CueWorkoutParams;
      return R.compose(
        R.assocPath<CueWorkoutParams, State>(['cueWorkout', 'params'], params)
      )(state);
    }

    case ActionTypes.setAudioContext: {
      const audioContext = payload as AudioContext;
      return R.compose(
        R.assocPath<AudioContext, State>(['audioContext'], audioContext)
      )(state);
    }

    case ActionTypes.setNoteState: {
      const noteState = payload as NoteState;
      return R.compose(R.assocPath<NoteState, State>(['note'], noteState))(
        state
      );
    }
    case ActionTypes.setSpeedWorkouts: {
      const workouts = payload as { [id: string]: SpeedWorkout };
      return R.compose(
        R.assocPath<{ [id: string]: SpeedWorkout }, State>(
          ['speedWorkouts'],
          workouts
        )
      )(state);
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
