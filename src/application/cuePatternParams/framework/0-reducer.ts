import { createSlice } from '@reduxjs/toolkit';
import { ICuePatternParams } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const cuePatternParamsSlice = createSlice({
  name: 'cuePatternParams',
  initialState: initialState,
  reducers: {
    setProps: (state, { payload }: { payload: ICuePatternParams }) => payload,
    updateProps: (state, { payload }: { payload: ICuePatternParams }) =>
      payload,
  },
});

export const cuePatternParamsActions = cuePatternParamsSlice.actions;

export default cuePatternParamsSlice.reducer;
