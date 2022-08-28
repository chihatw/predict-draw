export type WorkoutId = {
  id: string;
  value: string;
};

export type PageState = {
  id: string;
  state: string;
};

export type WorkoutItem = {
  text: string;
  chinese: string;
  pitchesArray: string;
};

export type Workout = {
  id: string;
  cues: string[];
  items: WorkoutItem[];
  label: string;
  cueType: string;
  beatCount: number;
  createdAt: number;
};

export type WorkoutRound = {
  currentRound: number;
  totalRounds: number;
};

export type WorkoutTime = {
  time: number;
  bpm: number;
  isRunning: boolean;
};

export const INITIAL_WORKOUT: Workout = {
  id: '',
  items: [],
  label: '',
  beatCount: 0,
  createdAt: 0,
  cueType: '',
  cues: [],
};

export const pages = {
  note: 'note',
  blank: 'blank',
  bpmCalc: 'bpmCalc',
  cueWorkout: 'cueWorkout',
  workoutCue: 'workoutCue',
  workoutRead: 'workoutRead',
  randomWorkout: 'randomWorkout',
  workingMemory: 'workingMemory',
};

export type WorkoutParams = {
  workoutId: string;
  currentRound: number;
  totalRounds: number;
  time: number;
  bpm: number;
  isRunning: boolean;
  checkedIndexes: number[];
};

export const INITIAL_WORKOUT_ROUND = {
  currentRound: 1,
  totalRounds: 0,
};

export const INITIAL_WORKOUT_TIME = {
  time: 0,
  bpm: -1,
  isRunning: false,
};

export const INITIAL_WORKOUT_PARAMS: WorkoutParams = {
  ...INITIAL_WORKOUT_TIME,
  ...INITIAL_WORKOUT_ROUND,
  workoutId: '',
  checkedIndexes: [],
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

export type CueWorkoutCue = {
  colors: string[];
  verb: string;
  isInverse: boolean;
};

export const INITIAL_CUE_WORKOUT_CUE: CueWorkoutCue = {
  colors: [],
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
};

export const INITIAL_CUE_WORKOUT_PARAMS: CueWorkoutParams = {
  time: 0,
  isRunning: false,
  points: 0,
  colors: [],
  verbs: [],
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

export type State = {
  audioContext: AudioContext | null;
  note: NoteState;
  workouts: Workout[];
  workoutParams: WorkoutParams;
  pageStates: {
    liSan: string;
    kouSan: string;
    chinSan: string;
  };
  randomWorkout: RandomWotkoutState;
  cueWorkout: CueWorkoutState;
  workingMemory: WorkingMemory;
  workingMemoryAnswerIds: string[];
  blobs: {
    [audioPath: string]: Blob;
  };
  blobURLs: {
    [imagePath: string]: string;
  };
};
