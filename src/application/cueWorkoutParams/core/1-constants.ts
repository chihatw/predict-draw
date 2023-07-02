import { ICueWorkoutParams } from './0-interface';

export const initialState: ICueWorkoutParams = {
  points: 0,
  time: 0,
  lastPattern: {
    ni: 'に',
    wo: 'を',
    doushi: '入れる',
    grouping: 'none',
    isNegative: false,
    isWoFirst: false,
    sentence: '',
    topic: 'none',
  },
  colors: [],
  isRunning: false,
};
