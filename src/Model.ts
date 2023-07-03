import { ICuePattern } from 'application/cuePattern/core/0-interface';
import { initialState } from 'application/cuePattern/core/1-constants';
import { ICueWorkoutCard } from 'application/cueWorkoutCards/core/0-interface';
import { ICueCard } from 'application/cueWorkoutCue/core/0-interface';

export const SENTENCE_TYPES = { positive: 'positive', negative: 'negative' };
export const KAKU_ORDERS = { woFirst: 'woFirst', niFirst: 'niFirst' };

export type Schedule = { offset: number; start: number; stop: number };

export type NoteState = {
  texts: string[];
  pitches: string[];
};

export const INITIAL_NOTE_STATE: NoteState = {
  texts: [],
  pitches: [],
};

export const INITIAL_CUE_WORKOUT_CARD: ICueWorkoutCard = {
  id: '',
  label: '',
  pitchStr: '',
  hasTailAccent: false,
};

export type CueWorkoutCue = {
  text: string;
  verb: ICueCard;
  nouns: ICueCard[];
  header: ICueCard;
  pattern: ICuePattern;
};

export const INITIAL_CUE_WORKOUT_CUE: CueWorkoutCue = {
  nouns: [],
  verb: { label: '', pitchStr: '' },
  text: '',
  header: { label: '', pitchStr: '' },
  pattern: initialState,
};

export type CueWorkoutState = {
  cue: CueWorkoutCue;
};

export const INITIAL_CUE_WORKOUT_STATE: CueWorkoutState = {
  cue: INITIAL_CUE_WORKOUT_CUE,
};

export type VoiceProps = {
  id: string;
  startAt: number;
  stopAt: number;
  pitchStr: string;
  storagePath: string;
};

export const INITIAL_VOICE_PROPS: VoiceProps = {
  id: '',
  startAt: 0,
  stopAt: 0,
  pitchStr: '',
  storagePath: '',
};

export type RecordVoiceParams = {
  activeIds: string[];
  targetAssetId: string;
  targetPitchStr: string;
};

export type RecordVoice = {
  raw: VoiceProps;
  assets: {
    [id: string]: VoiceProps;
  };
  params: RecordVoiceParams;
  logs: {
    selected: string;
  };
};

export const INITIAL_RECORD_VOICE: RecordVoice = {
  raw: {
    ...INITIAL_VOICE_PROPS,
    id: 'raw',
  },
  assets: {},
  params: {
    activeIds: [],
    targetAssetId: '',
    targetPitchStr: '',
  },
  logs: {
    selected: '',
  },
};

export type State = {
  note: NoteState;
  cueWorkout: CueWorkoutState;
  audioBuffers: {
    [downloadURL: string]: AudioBuffer;
  };
  recordVoice: RecordVoice;
};

export const INITIAL_STATE: State = {
  note: INITIAL_NOTE_STATE,
  cueWorkout: INITIAL_CUE_WORKOUT_STATE,
  audioBuffers: {},
  recordVoice: INITIAL_RECORD_VOICE,
};
