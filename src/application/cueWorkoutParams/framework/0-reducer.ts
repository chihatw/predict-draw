import { createSlice } from '@reduxjs/toolkit';
import { ICueWorkoutParams } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const cueWorkoutParamsSlice = createSlice({
  name: 'cueWorkoutParamas',
  initialState,
  reducers: {
    setProps: (state, { payload }: { payload: ICueWorkoutParams }) => payload,
    setColors: (state, { payload }: { payload: string[] }) => {
      state.colors = payload;
    },
    setTime: (state, { payload }: { payload: number }) => {
      state.time = payload;
    },
    reset: (state) => {
      state.isRunning = false;
      state.points = 0;
    },
    start: (state) => {
      state.isRunning = true;
    },
    next: (state) => {
      state.points++;
    },
    stop: (state) => {
      state.isRunning = false;
    },
  },
});

export const cueWorkoutParamsActions = cueWorkoutParamsSlice.actions;

export default cueWorkoutParamsSlice.reducer;
