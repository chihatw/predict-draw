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

export const pages = {
  note: 'note',
  blank: 'blank',
  micTest: 'micTest',
  cueWorkout: 'cueWorkout',
  recordVoiceList: 'recordVoiceList',
  speedWorkoutCue: 'speedWorkoutCue',
  speedWorkoutRead: 'speedWorkoutRead',
  speedWorkoutSolo: 'speedWorkoutSolo',
};

export const PAGE_STATE: { value: string; label: string }[] = [
  { value: pages.speedWorkoutSolo, label: '速読ソロ' },
  { value: pages.speedWorkoutCue, label: '速読キュー' },
  { value: pages.speedWorkoutRead, label: '速読練習' },
  { value: pages.cueWorkout, label: '紙コップ' },
  { value: pages.note, label: 'ノート' },
  { value: pages.blank, label: '空欄' },
  { value: pages.micTest, label: 'マイクテスト' },
  { value: pages.recordVoiceList, label: '録音リスト' },
];

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

export type WorkoutRound = {
  currentRound: number;
  totalRounds: number;
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

export type RandomWorkout = {
  id: string;
  cues: Cue[];
  time: number;
  title: string;
  beatCount: number;
  targetBpm: number;
  roundCount: number;
  storagePath: string;
};

export const INITIAL_RANDOM_WORKOUT: RandomWorkout = {
  id: '',
  cues: [],
  time: 0,
  title: '',
  beatCount: 0,
  targetBpm: 0,
  roundCount: 1,
  storagePath: '',
};

export type RandomWorkoutParams = {
  time: number;
  cueIds: string[];
  isRunning: boolean;
  currentIndex: number;
  isChecking: boolean;
  blob: Blob | null;
};

export const INITIAL_RANDOM_WORKOUT_PARAMS: RandomWorkoutParams = {
  time: 0,
  cueIds: [],
  isRunning: false,
  currentIndex: 0,
  isChecking: false,
  blob: null,
};

export type RandomWorkoutState = {
  workoutId: string;
  params: RandomWorkoutParams;
  workouts: {
    [workoutId: string]: RandomWorkout;
  };
  audioBuffers: { [downloadURL: string]: AudioBuffer };
};

export const INITIAL_RANDOM_WORKOUT_STATE: RandomWorkoutState = {
  workoutId: '',
  params: INITIAL_RANDOM_WORKOUT_PARAMS,
  workouts: {},
  audioBuffers: {},
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

export type WorkingMemoryCue = {
  id: string;
  end: number;
  start: number;
  pitchStr: string;
};

export const INITIAL_WORKING_MEMORY_CUE: WorkingMemoryCue = {
  id: '',
  pitchStr: '',
  start: 0,
  end: 0,
};

export type WorkingMemoryAnswer = {
  createdAt: number;
  cuePitchStrs: string[];
  inputPitchStrs: string[];
  score: number;
  offset: number;
};

export type WorkingMemory = {
  id: string;
  offset: number;
  cueCount: number;
  storagePath: string;
  cues: { [id: string]: WorkingMemoryCue };
  cueIds: string[]; // for monitor
};

export const INITIAL_WORKING_MEMORY: WorkingMemory = {
  id: '',
  offset: 0,
  cueCount: 0,
  storagePath: '',
  cues: {},
  cueIds: [],
};

export type RhythmListState = {
  tapped: string[];
  mora: number;
};

export type PitchListState = {
  tapped: string[];
  mora: number;
};

export type RhythmWorkout = {
  mora: number;
  cueIds: string[];
  cueCount: number;
};

export type PitchWorkout = {
  mora: number;
  cueIds: string[];
};

export type PitchInput = {
  mora: number;
  cueIds: string[];
  hasA: boolean;
  hasN: boolean;
  hasX: boolean;
  normalOnly: boolean;
};

export type PitchInputLogs = {
  [index: number]: string;
};

export type KanaWorkoutParams = {
  kanas: string[];
  answers: { [index: number]: string[] };
  currentIndex: number;
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
  kanaWorkout: KanaWorkoutParams;
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
  audioContext: AudioContext | null;
  pageStates: {
    liSan: string;
    kouSan: string;
    chinSan: string;
  };
  note: NoteState;
  cueWorkout: CueWorkoutState;
  speedWorkouts: { [id: string]: SpeedWorkout };
  randomWorkout: RandomWorkoutState;
  workingMemory: WorkingMemory;
  rhythmList: RhythmListState;
  rhythmWorkout: RhythmWorkout;
  rhythmWorkoutAnswers: { [index: number]: string[] };
  pitchList: PitchListState;
  pitchWorkout: PitchWorkout;
  pitchInput: PitchInput;
  pitchInputLogs: PitchInputLogs;
  pitchWorkoutAnswers: { [index: number]: string[] };
  workingMemoryAnswerIds: string[];
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
  audioContext: null,
  note: INITIAL_NOTE_STATE,
  speedWorkouts: {},
  pageStates: {
    liSan: '',
    kouSan: '',
    chinSan: '',
  },
  cueWorkout: INITIAL_CUE_WORKOUT_STATE,
  // workoutParams: INITIAL_WORKOUT_PARAMS,
  randomWorkout: INITIAL_RANDOM_WORKOUT_STATE,
  workingMemory: INITIAL_WORKING_MEMORY,
  workingMemoryAnswerIds: [],
  rhythmList: { tapped: [], mora: 2 },
  rhythmWorkout: { mora: 2, cueIds: [], cueCount: 0 },
  rhythmWorkoutAnswers: {},
  pitchList: { tapped: [], mora: 2 },
  pitchWorkout: { mora: 2, cueIds: [] },
  pitchInput: {
    mora: 2,
    cueIds: [],
    hasA: true,
    hasN: true,
    hasX: true,
    normalOnly: true,
  },
  pitchInputLogs: {},
  pitchWorkoutAnswers: {},
  params: {
    kanaWorkout: {
      kanas: [],
      currentIndex: 0,
      answers: {},
    },
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
