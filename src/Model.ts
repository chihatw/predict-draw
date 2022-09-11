export const pages = {
  note: 'note',
  blank: 'blank',
  kanaCards: 'kanakanaCards',
  rhythmList: 'rhythmList',
  cueWorkout: 'cueWorkout',
  kanaWorkout: 'kanaWorkout',
  // randomWorkout: 'randomWorkout',
  workingMemory: 'workingMemory',
  rhythmWorkout: 'rhythmWorkout',
  speedWorkoutCue: 'speedWorkoutCue',
  speedWorkoutRead: 'speedWorkoutRead',
  speedWorkoutSolo: 'speedWorkoutSolo',
};

export const CUE_TYPES = { STRING: 'string', PITCH: 'pitchesArray' };

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

// todo will delete
export type WorkoutTime = {
  time: number;
  bpm: number;
  isRunning: boolean;
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

export type RandomWotkoutState = {
  workoutId: string;
  params: RandomWorkoutParams;
  workouts: {
    [workoutId: string]: RandomWorkout;
  };
  blobs: {
    [workoutId: string]: Blob | null;
  };
};

export const INITIAL_RANDOM_WORKOUT_STATE: RandomWotkoutState = {
  workoutId: '',
  params: INITIAL_RANDOM_WORKOUT_PARAMS,
  workouts: {},
  blobs: {},
};

export type CueWorkoutCard = {
  id: string;
  pitchStr: string;
  imagePath: string;
  hasTailAccent: boolean;
};

export const INITIAL_CUE_WORKOUT_CARD: CueWorkoutCard = {
  id: '',
  pitchStr: '',
  imagePath: '',
  hasTailAccent: false,
};

/**
 * nouns: ２つの名詞を持つ
 * verb: 1つの動詞を持つ
 * isInverse: 「を」「に」の順番が、逆順かどうか
 */
export type CueWorkoutCue = {
  nouns: string[];
  verb: string;
  isInverse: boolean;
};

export const INITIAL_CUE_WORKOUT_CUE: CueWorkoutCue = {
  nouns: [],
  verb: '',
  isInverse: false,
};

export type CueWorkoutParams = {
  time: number;
  isRunning: boolean;
  points: number;
  colors: string[];
  verbs: string[];
  isRandom: boolean;
  isInverse: boolean;
  hands: string[];
};

export const INITIAL_CUE_WORKOUT_PARAMS: CueWorkoutParams = {
  time: 0,
  isRunning: false,
  points: 0,
  colors: [],
  verbs: [],
  hands: [],
  isRandom: false,
  isInverse: false,
};

export type CueWorkoutState = {
  cards: { [id: string]: CueWorkoutCard };
  params: CueWorkoutParams;
  cue: CueWorkoutCue;
};

export const INITIAL_CUE_WORKOUT_STATE: CueWorkoutState = {
  cards: {},
  cue: INITIAL_CUE_WORKOUT_CUE,
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

export type RhythmWorkout = {
  mora: number;
  cueIds: string[];
  cueCount: number;
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

export type State = {
  audioContext: AudioContext | null;
  pageStates: {
    liSan: string;
    kouSan: string;
    chinSan: string;
  };
  note: NoteState;
  kanaCards: KanaCards;
  rhythmList: RhythmListState;
  cueWorkout: CueWorkoutState;
  speedWorkouts: { [id: string]: SpeedWorkout };
  randomWorkout: RandomWotkoutState;
  workingMemory: WorkingMemory;
  rhythmWorkout: RhythmWorkout;
  rhythmWorkoutAnswers: { [index: number]: string[] };
  workingMemoryAnswerIds: string[];
  params: Params;
  blobs: {
    [audioPath: string]: Blob;
  };
  blobURLs: {
    [imagePath: string]: string;
  };
};
