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
  blank: 'blank',
  bpmCalc: 'bpmCalc',
  workoutCue: 'workoutCue',
  workoutRead: 'workoutRead',
  randomWorkout: 'randomWorkout',
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
  isChecked: boolean;
};

export const INITIAL_RANDOM_WORKOUT_PARAMS: RandomWorkoutParams = {
  time: 0,
  cueIds: [],
  isRunning: false,
  currentIndex: 0,
  isChecked: false,
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
  blobURLs: {
    [imagePath: string]: string;
  };
};

export const INITIAL_RANDOM_WORKOUT_STATE: RandomWotkoutState = {
  workoutId: '',
  params: INITIAL_RANDOM_WORKOUT_PARAMS,
  workouts: {},
  blobs: {},
  blobURLs: {},
};

export type State = {
  note: NoteState;
  workouts: Workout[];
  workoutParams: WorkoutParams;
  liSanPageState: string;
  kouSanPageState: string;
  randomWorkout: RandomWotkoutState;
};

export const INITIAL_STATE: State = {
  note: INITIAL_NOTE_STATE,
  workouts: [],
  liSanPageState: pages.blank,
  kouSanPageState: pages.blank,
  workoutParams: INITIAL_WORKOUT_PARAMS,
  randomWorkout: INITIAL_RANDOM_WORKOUT_STATE,
};
