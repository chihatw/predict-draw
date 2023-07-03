import { createSlice } from '@reduxjs/toolkit';
import { ICuePattern } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const cuePatternSlice = createSlice({
  name: 'cuePattern',
  initialState: initialState,
  reducers: {
    setProps: (state, { payload }: { payload: ICuePattern }) => payload,
  },
});

export const cuePatternActions = cuePatternSlice.actions;

export default cuePatternSlice.reducer;
