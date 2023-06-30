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

export const CUE_TYPES = { STRING: 'string', PITCH: 'pitchesArray' };
export const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];

export type PageState = {
  id: string;
  state: string;
};

export type SpeedWorkoutItem = {
  text: string;
  chinese: string;
  pitchesArray: string;
};

export type SpeedWorkout = {
  id: string;
  cues: string[];
  items: SpeedWorkoutItem[];
  label: string;
  cueType: string;
  beatCount: number;
  createdAt: number;
};

export const INITIAL_WORKOUT: SpeedWorkout = {
  id: '',
  cues: [],
  items: [],
  label: '',
  cueType: '',
  createdAt: 0,
  beatCount: 0,
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
  imagePath: string;
  hasTailAccent: boolean;
};

export const INITIAL_CUE_WORKOUT_CARD: CueWorkoutCard = {
  id: '',
  label: '',
  pitchStr: '',
  imagePath: '',
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

export type PatternParams = {
  hasWoTopic: boolean;
  hasNiTopic: boolean;
  hasNoneTopic: boolean;
  hasWoGroping: boolean;
  hasNiGroping: boolean;
  hasNoneGroping: boolean;
  hasStraightOrder: boolean;
  hasInvertOrder: boolean;
  hasPositive: boolean;
  hasNegative: boolean;
  hasGroupingTopic: boolean;
};

export const INITIAL_PATTERN_PARAMS: PatternParams = {
  hasWoTopic: false,
  hasNiTopic: false,
  hasNoneTopic: true,
  hasWoGroping: false,
  hasNiGroping: false,
  hasNoneGroping: true,
  hasStraightOrder: true,
  hasInvertOrder: false,
  hasPositive: true,
  hasNegative: false,
  hasGroupingTopic: false,
};

export type CueWorkoutParams = {
  time: number;
  points: number;
  colors: string[];
  isRunning: boolean;
  patternParams: PatternParams;
  lastPattern: Pattern;
};

export const INITIAL_CUE_WORKOUT_PARAMS: CueWorkoutParams = {
  time: 0,
  colors: [],
  points: 0,
  isRunning: false,
  patternParams: INITIAL_PATTERN_PARAMS,
  lastPattern: INITIAL_PATTERN,
};

export type CueWorkoutState = {
  cue: CueWorkoutCue;
  cards: { [id: string]: CueWorkoutCard };
  params: CueWorkoutParams;
};

export const INITIAL_CUE_WORKOUT_STATE: CueWorkoutState = {
  cue: INITIAL_CUE_WORKOUT_CUE,
  cards: {},
  params: INITIAL_CUE_WORKOUT_PARAMS,
};

export type SpeedWorkoutParams = {
  bpm: number;
  checkedIndexes: number[];
  updatedAt: number;
  isRunning: boolean;
  selectedId: string;
  totalRounds: number;
  currentRound: number;
};

export type Params = {
  speedWorkout: SpeedWorkoutParams;
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
  speedWorkouts: { [id: string]: SpeedWorkout };
  params: Params;
  audioBuffers: {
    [downloadURL: string]: AudioBuffer;
  };
  blobURLs: {
    [imagePath: string]: string;
  };
  recordVoice: RecordVoice;
};

export const INITIAL_STATE: State = {
  note: INITIAL_NOTE_STATE,
  speedWorkouts: {},
  cueWorkout: INITIAL_CUE_WORKOUT_STATE,
  params: {
    speedWorkout: {
      bpm: 0,
      isRunning: false,
      selectedId: '',
      updatedAt: 0,
      totalRounds: 1,
      checkedIndexes: [],
      currentRound: 1,
    },
  },
  blobURLs: {},
  audioBuffers: {},
  recordVoice: INITIAL_RECORD_VOICE,
};
