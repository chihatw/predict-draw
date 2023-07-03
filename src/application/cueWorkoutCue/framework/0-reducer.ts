import { createSlice } from '@reduxjs/toolkit';
import { ICueWorkoutCue } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const cueWorkoutCueSlice = createSlice({
  name: 'cueWorkoutCue',
  initialState: initialState,
  reducers: {
    setProps: (state, { payload }: { payload: ICueWorkoutCue }) => payload,
  },
});

export const cueWorkoutCueActions = cueWorkoutCueSlice.actions;

export default cueWorkoutCueSlice.reducer;
