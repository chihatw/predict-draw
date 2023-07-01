import { ISpeedWorkoutParams } from './0-interface';

export const initialState: ISpeedWorkoutParams = {
  bpm: 0,
  updatedAt: 0,
  isRunning: false,
  selectedId: '',
  totalRounds: 2,
  currentRound: 1,
  checkedIndexes: [],
};
