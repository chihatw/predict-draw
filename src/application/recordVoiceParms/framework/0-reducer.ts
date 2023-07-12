import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../core/1-constants';

const recordVoiceParamsSlice = createSlice({
  name: 'recordVoiceParams',
  initialState,
  reducers: {},
});

export const recordVoiceParamsActions = recordVoiceParamsSlice.actions;

export default recordVoiceParamsSlice.reducer;
