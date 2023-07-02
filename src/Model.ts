export const SENTENCE_TYPES = { positive: 'positive', negative: 'negative' };
export const KAKU_ORDERS = { woFirst: 'woFirst', niFirst: 'niFirst' };
export const TARGET = {
  none: 'none',
  wo: 'wo',
  ni: 'ni',
};

export type Pattern = {
  wo: string;
  ni: string;
  doushi: string;
  topic: string;
  sentence: string;
  grouping: string;
  isWoFirst: boolean;
  isNegative: boolean;
};

export const INITIAL_PATTERN: Pattern = {
  wo: 'を',
  ni: 'に',
  topic: TARGET.none,
  doushi: '入れる',
  sentence: '青を赤に入れる',
  grouping: TARGET.none,
  isWoFirst: true,
  isNegative: false,
};

export type Schedule = { offset: number; start: number; stop: number };

export const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];

export type SpeedWorkoutItem = {
  text: string;
  chinese: string;
  pitchesArray: string;
};

export type NoteState = {
  texts: string[];
  pitches: string[];
};

export const INITIAL_NOTE_STATE: NoteState = {
  texts: [],
  pitches: [],
};

export type Cue = {
  id: string;
  label: string;
  pitchStr: string;
  imagePath: string;
};

export const INITIAL_CUE: Cue = {
  id: '',
  label: '',
  pitchStr: '',
  imagePath: '',
};

export type CueWorkoutCard = {
  id: string;
  label: string;
  pitchStr: string;
  hasTailAccent: boolean;
};

export const INITIAL_CUE_WORKOUT_CARD: CueWorkoutCard = {
  id: '',
  label: '',
  pitchStr: '',
  hasTailAccent: false,
};

export type CueCardProps = {
  label: string;
  pitchStr: string;
};

export const INITIAL_CUE_CARD_PROPS: CueCardProps = {
  label: '',
  pitchStr: '',
};

export type CueWorkoutCue = {
  text: string;
  verb: CueCardProps;
  nouns: CueCardProps[];
  header: CueCardProps;
  pattern: Pattern;
};

export const INITIAL_CUE_WORKOUT_CUE: CueWorkoutCue = {
  nouns: [],
  verb: INITIAL_CUE_CARD_PROPS,
  text: '',
  header: INITIAL_CUE_CARD_PROPS,
  pattern: INITIAL_PATTERN,
};

// export type CueWorkoutParams = {
//   time: number;
//   points: number;
//   colors: string[];
//   isRunning: boolean;
//   patternParams: ICuePatternParams;
//   lastPattern: Pattern;
// };

export type CueWorkoutState = {
  cue: CueWorkoutCue;
  cards: { [id: string]: CueWorkoutCard };
};

export const INITIAL_CUE_WORKOUT_STATE: CueWorkoutState = {
  cue: INITIAL_CUE_WORKOUT_CUE,
  cards: {},
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
