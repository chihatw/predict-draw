import { ICueWorkoutParams } from './0-interface';

export const INITIAL_LAST_PATTERNS = {
  ni: 'に',
  wo: 'を',
  doushi: '入れる',
  grouping: 'none',
  isNegative: false,
  isWoFirst: false,
  sentence: '',
  topic: 'none',
};

export const initialState: ICueWorkoutParams = {
  points: 0,
  time: 0,
  lastPattern: INITIAL_LAST_PATTERNS,
  colors: [],
  isRunning: false,
};
