import { createSlice } from '@reduxjs/toolkit';
import { ICueWorkoutParams } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const cueWorkoutParamsSlice = createSlice({
  name: 'cueWorkoutParamas',
  initialState,
  reducers: {
    setProps: (state, { payload }: { payload: ICueWorkoutParams }) => payload,
    reset: (state) => {
      state.isRunning = false;
      state.points = 0;
    },
  },
});

export const cueWorkoutParamsActions = cueWorkoutParamsSlice.actions;

export default cueWorkoutParamsSlice.reducer;
