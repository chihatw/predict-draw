import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IRecordVoiceAsset } from '../core/0-interface';

const recordVoiceAssetAdapter = createEntityAdapter<IRecordVoiceAsset>({
  selectId: (recordVoiceAsset) => recordVoiceAsset.id,
});

const recordVoiceAssetsSlice = createSlice({
  name: 'recordVoiceAssets',
  initialState: recordVoiceAssetAdapter.getInitialState(),
  reducers: {
    setAll: (state, { payload }: { payload: IRecordVoiceAsset[] }) => {
      recordVoiceAssetAdapter.setAll(state, payload);
    },
    addAsset: (state, { payload }: { payload: IRecordVoiceAsset }) => {
      recordVoiceAssetAdapter.addOne(state, payload);
    },
    changePitchStr: (
      state,
      {
        payload: { id, pitchStr },
      }: { payload: { id: string; pitchStr: string } }
    ) => {
      const target = state.entities[id];
      recordVoiceAssetAdapter.updateOne(state, {
        id,
        changes: { ...target, pitchStr },
      });
    },
    changeStartAt: (
      state,
      { payload: { id, startAt } }: { payload: { id: string; startAt: number } }
    ) => {
      const target = state.entities[id];
      recordVoiceAssetAdapter.updateOne(state, {
        id,
        changes: { ...target, startAt },
      });
    },
    changeStopAt: (
      state,
      { payload: { id, stopAt } }: { payload: { id: string; stopAt: number } }
    ) => {
      const target = state.entities[id];
      recordVoiceAssetAdapter.updateOne(state, {
        id,
        changes: { ...target, stopAt },
      });
    },
    removeOne: (state, { payload }: { payload: string }) => {
      recordVoiceAssetAdapter.removeOne(state, payload);
    },
  },
});

export const recordVoiceAssetsActions = recordVoiceAssetsSlice.actions;

export default recordVoiceAssetsSlice.reducer;
