import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IPageState } from '../core/0-interface';

const pageStateAdapter = createEntityAdapter<IPageState>({
  selectId: (pageState) => pageState.id,
});

const pageStatesSlice = createSlice({
  name: 'pageStates',
  initialState: pageStateAdapter.getInitialState(),
  reducers: {},
});

export const pageStatesActins = pageStatesSlice.actions;

export default pageStatesSlice.reducer;

// todo export const { } = pageStateAdapter.getSelectors()
