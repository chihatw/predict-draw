import { createSlice } from '@reduxjs/toolkit';

const mngPageSlice = createSlice({
  name: 'mngPage',
  initialState: {},
  reducers: {
    initiate: () => {},
  },
});

export const mngPageActions = mngPageSlice.actions;

export default mngPageSlice.reducer;
