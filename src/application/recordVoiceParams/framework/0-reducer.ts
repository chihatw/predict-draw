import { createSlice } from '@reduxjs/toolkit';
import { IRecordVoiceParams } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const recordVoiceParamsSlice = createSlice({
  name: 'recordVoiceParams',
  initialState,
  reducers: {
    setParams: (state, { payload }: { payload: IRecordVoiceParams }) => payload,
    changeRawPitchStr: (state, { payload }: { payload: string }) => {
      state.rawPitchStr = payload;
    },
    changeRecordedPitchStr: (state, { payload }: { payload: string }) => {
      state.recordedPitchStr = payload;
    },
    changeHasRaw: (state, { payload }: { payload: boolean }) => {
      state.hasRaw = payload;
    },
  },
});

export const recordVoiceParamsActions = recordVoiceParamsSlice.actions;

export default recordVoiceParamsSlice.reducer;
