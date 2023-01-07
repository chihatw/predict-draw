export type Schedule = { offset: number; start: number; stop: number };

export const pages = {
  note: 'note',
  blank: 'blank',
  micTest: 'micTest',
  kanaCards: 'kanaCards',
  pitchList: 'pitchList',
  rhythmList: 'rhythmList',
  cueWorkout: 'cueWorkout',
  pitchInput: 'pitchInput',
  kanaWorkout: 'kanaWorkout',
  pitchWorkout: 'pitchWorkout',
  workingMemory: 'workingMemory',
  rhythmWorkout: 'rhythmWorkout',
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
  // { value: pages.workingMemory, label: 'ワーキングメモリ' },
  { value: pages.note, label: 'ノート' },
  // { value: pages.rhythmList, label: 'リズム表示' },
  // { value: pages.rhythmWorkout, label: 'リズム練習' },
  // { value: pages.pitchList, label: 'ピッチ表示' },
  // { value: pages.pitchWorkout, label: 'ピッチ練習' },
  { value: pages.pitchInput, label: 'ピッチ入力' },
  // { value: pages.kanaCards, label: 'かな表示' },
  // { value: pages.kanaWorkout, label: 'かな練習' },
  { value: pages.blank, label: '空欄' },
  // { value: pages.randomWorkout, label: 'ランダム（実演用）' },
  { value: pages.micTest, label: 'マイクテスト' },
  { value: pages.recordVoiceList, label: '録音リスト' },
];

export const JOSHI_PATTERN = {
  default: 'default',
  inverse: 'inverse',
  topic_wo_head: 'topic_wo_head',
  topic_wo_tail: 'topic_wo_tail',
  topic_ni_head: 'topic_ni_head',
  topic_ni_tail: 'topic_ni_tail',
  group_wo_head: 'group_wo_head',
  group_wo_tail: 'group_wo_tail',
  group_ni_head: 'group_ni_head',
  group_ni_tail: 'group_ni_tail',
};

export const NEVER_ALWAYS_RANDOM = {
  never: 'never',
  always: 'always',
  random: 'random',
};

export const SHOW_VERB = {
  show: 'show',
  hide: 'hide',
  showBoth: 'showBoth',
};

export const CUE_TYPES = { STRING: 'string', PITCH: 'pitchesArray' };

export const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
export const HANDS = ['mine', 'yours'];
export const VERBS = [
  'motsu',
  'yubisasu',
  'hikkurikaesu',
  'ireru',
  'noseru',
  'kabuseru',
];

export type PitchCard = {
  id: string;
  start: number;
  end: number;
  pitchStr: string;
};

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
};

export const INITIAL_CUE_WORKOUT_CUE: CueWorkoutCue = {
  nouns: [],
  verb: INITIAL_CUE_CARD_PROPS,
  text: '',
  header: INITIAL_CUE_CARD_PROPS,
};

export type CueWorkoutParams = {
  time: number;
  verbs: string[];
  points: number;
  colors: string[];
  showVerb: string;
  isRunning: boolean;
  hasHeader: boolean;
  joshiPatterns: string[];
  negativeSentence: string;
};

export const INITIAL_CUE_WORKOUT_PARAMS: CueWorkoutParams = {
  time: 0,
  verbs: [],
  colors: [],
  points: 0,
  showVerb: SHOW_VERB.show,
  isRunning: false,
  hasHeader: false,
  joshiPatterns: [],
  negativeSentence: NEVER_ALWAYS_RANDOM.never,
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

export type KanaCards = {
  kanas: string[];
  tapped: string[];
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
  kanaCards: KanaCards;
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
  kanaCards: { tapped: [], kanas: [] },
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
