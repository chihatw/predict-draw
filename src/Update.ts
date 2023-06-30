import * as R from 'ramda';
import {
  CueWorkoutCard,
  CueWorkoutCue,
  CueWorkoutParams,
  KanaCards,
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
  setBlobURLs: 'setBlobURLs',
  setPitchList: 'setPitchList',
  setNoteState: 'setNoteState',
  setPageState: 'setPageState',
  setRhythmList: 'setRhythmList',
  setAudioContext: 'setAudioContext',
  setSpeedWorkouts: 'setSpeedWorkouts',
  setCueWorkoutCue: 'setCueWorkoutCue',
  setWorkingMemory: 'setWorkingMemory',
  setRandomWorkouts: 'setRandomWorkouts',
  setCueWorkoutCards: 'setCueWorkoutCards',
  setCueWorkoutParams: 'setCueWorkoutParams',
  saveRandomWorkoutBlob: 'saveRandomWorkoutBlob',
  setRandomWorkoutParams: 'setRandomWorkoutParams',
  setWorkingMemoryAnswerIds: 'setWorkingMemoryAnswerIds',
  setRhythmWorkout: 'setRhythmWorkout',
  setRhythmWorkoutAnswers: 'setRhythmWorkoutAnswers',
  setPitchInput: 'setPitchInput',
  setPitchInputLogs: 'setPitchInputLogs',
  setRecordVoiceRaw: 'setRecordVoiceRaw',
  setRecordVoiceAssets: 'setRecordVoiceAssets',
  setRecordVoiceParams: 'setRecordVoiceParams',
  setRecordVoiceLogs: 'setRecordVoiceLogs',
  setPitchWorkout: 'setPitchWorkout',
  setPitchWorkoutAnswers: 'setPitchWorkoutAnswers',
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
    | KanaCards
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
  const { blobURLs } = state; // setBlobURLs で使用

  switch (type) {
    case ActionTypes.setSpeedWorkoutParams: {
      const params = payload as SpeedWorkoutParams;
      return R.assocPath<SpeedWorkoutParams, State>(
        ['params', 'speedWorkout'],
        params
      )(state);
    }

    case ActionTypes.setRhythmWorkout: {
      const rhythmWorkout = payload as RhythmWorkout;
      return R.assocPath<RhythmWorkout, State>(
        ['rhythmWorkout'],
        rhythmWorkout
      )(state);
    }
    case ActionTypes.setRhythmWorkoutAnswers: {
      const answers = payload as { [index: number]: string[] };
      return R.assocPath<{ [index: number]: string[] }, State>(
        ['rhythmWorkoutAnswers'],
        answers
      )(state);
    }
    case ActionTypes.setPitchWorkout: {
      const pitchWorkout = payload as PitchWorkout;
      return R.assocPath<PitchWorkout, State>(
        ['pitchWorkout'],
        pitchWorkout
      )(state);
    }
    case ActionTypes.setPitchInput: {
      const pitchInput = payload as PitchInput;
      return R.assocPath<PitchInput, State>(['pitchInput'], pitchInput)(state);
    }
    case ActionTypes.setPitchInputLogs: {
      const pitchInputLogs = payload as PitchInputLogs;
      return R.assocPath<PitchInputLogs, State>(
        ['pitchInputLogs'],
        pitchInputLogs
      )(state);
    }
    case ActionTypes.setPitchWorkoutAnswers: {
      const answers = payload as { [index: number]: string[] };
      return R.assocPath<{ [index: number]: string[] }, State>(
        ['pitchWorkoutAnswers'],
        answers
      )(state);
    }
    case ActionTypes.setRhythmList: {
      const rhythmList = payload as RhythmListState;
      return R.assocPath<RhythmListState, State>(
        ['rhythmList'],
        rhythmList
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
    case ActionTypes.setWorkingMemoryAnswerIds: {
      const answerIds = payload as string[];
      return R.assocPath<string[], State>(
        ['workingMemoryAnswerIds'],
        answerIds
      )(state);
    }

    case ActionTypes.setWorkingMemory: {
      const { workingMemory, audioBuffer } = payload as {
        workingMemory: WorkingMemory;
        audioBuffer: AudioBuffer | null;
      };
      const updatedAudioBuffers = { ...state.audioBuffers }; // <- audioBuffers
      if (audioBuffer) {
        updatedAudioBuffers[workingMemory.storagePath] = audioBuffer;
      }
      return R.compose(
        R.assocPath<WorkingMemory, State>(['workingMemory'], workingMemory),
        R.assocPath<{ [path: string]: AudioBuffer }, State>(
          ['audioBuffers'],
          updatedAudioBuffers
        )
      )(state);
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
    case ActionTypes.setBlobURLs: {
      const updatedBlobURLs = payload as { [imagePath: string]: string };
      return R.compose(
        R.assocPath<{ [imagePath: string]: string }, State>(['blobURLs'], {
          ...blobURLs,
          ...updatedBlobURLs,
        })
      )(state);
    }

    case ActionTypes.saveRandomWorkoutBlob: {
      const { workout, blob } = payload as {
        workout: RandomWorkout;
        blob: Blob;
      };
      return R.compose(
        R.assocPath<Blob, State>(['randomWorkout', 'blobs', workout.id], blob), // <- audioBuffers
        R.assocPath<RandomWorkout, State>(
          ['randomWorkout', 'workouts', workout.id],
          workout
        ),
        R.assocPath<boolean, State>(
          ['randomWorkout', 'params', 'isChecking'],
          false
        )
      )(state);
    }
    case ActionTypes.setAudioContext: {
      const audioContext = payload as AudioContext;
      return R.compose(
        R.assocPath<AudioContext, State>(['audioContext'], audioContext)
      )(state);
    }
    case ActionTypes.setRandomWorkoutParams: {
      const { params, workoutId } = payload as {
        params: RandomWorkoutParams;
        workoutId: string;
      };
      return R.compose(
        R.assocPath<string, State>(['randomWorkout', 'workoutId'], workoutId),
        R.assocPath<RandomWorkoutParams, State>(
          ['randomWorkout', 'params'],
          params
        )
      )(state);
    }
    case ActionTypes.setRandomWorkouts: {
      const { randomWorkouts, blobs } = payload as {
        // <- audioBuffers
        randomWorkouts: { [workoutId: string]: RandomWorkout };
        blobs: { [workoutId: string]: Blob | null };
      };
      return R.compose(
        R.assocPath<{ [workoutId: string]: RandomWorkout }, State>(
          ['randomWorkout', 'workouts'],
          randomWorkouts
        ),
        R.assocPath<{ [workoutId: string]: Blob | null }, State>(
          ['randomWorkout', 'blobs'],
          blobs
        )
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
