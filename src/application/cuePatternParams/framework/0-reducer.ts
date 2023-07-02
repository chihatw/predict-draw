import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const cuePatternParamsSlice = createSlice({
  name: 'cuePatternParams',
  initialState: initialState,
  reducers: {},
});

export const cuePatternParamsActions = cuePatternParamsSlice.actions;

export default cuePatternParamsSlice.reducer;
