import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const cueWorkoutParamsSlice = createSlice({
  name: 'cueWorkoutParamas',
  initialState,
  reducers: {},
});

export const cueWorkoutParamsActions = cueWorkoutParamsSlice.actions;

export default cueWorkoutParamsSlice.reducer;
