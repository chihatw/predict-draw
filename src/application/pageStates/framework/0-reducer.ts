import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IPageState } from '../core/0-interface';

const pageStateAdapter = createEntityAdapter<IPageState>({
  selectId: (pageState) => pageState.id,
});

const pageStatesSlice = createSlice({
  name: 'pageStates',
  initialState: pageStateAdapter.getInitialState(),
  reducers: {
    upsertPageStates: (state, { payload }: { payload: IPageState[] }) => {
      pageStateAdapter.upsertMany(state, payload);
    },
    changePageState: (
      state,
      { payload: { id, state: pageState } }: { payload: IPageState }
    ) => {
      state.entities[id]!.state = pageState;
    },
  },
});

export const pageStatesActins = pageStatesSlice.actions;

export default pageStatesSlice.reducer;
