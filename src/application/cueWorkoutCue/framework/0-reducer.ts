import { createSlice } from '@reduxjs/toolkit';
import { ICuePatternParams } from 'application/cuePatternParams/core/0-interface';
import { ICueWorkoutCue } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const cueWorkoutCueSlice = createSlice({
  name: 'cueWorkoutCue',
  initialState: initialState,
  reducers: {
    setProps: (state, { payload }: { payload: ICueWorkoutCue }) => payload,
    updateCueStart: (
      state,
      {
        payload,
      }: { payload: { colors: string[]; cuePatternParams: ICuePatternParams } }
    ) => state,
  },
});

export const cueWorkoutCueActions = cueWorkoutCueSlice.actions;

export default cueWorkoutCueSlice.reducer;
