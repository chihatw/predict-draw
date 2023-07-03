import { createSlice } from '@reduxjs/toolkit';
import { INote } from '../core/0-interface';
import { initialState } from '../core/1-constants';
import { buildNoteFromString } from '../core/2-services';

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setProps: (state, { payload }: { payload: INote }) => payload,
    update: (state, { payload }: { payload: string }) => {
      return buildNoteFromString(payload);
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
