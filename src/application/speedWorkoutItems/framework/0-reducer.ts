import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ISpeedWorkoutItem } from '../core/0-interface';

const speedWorkoutItemAdapter = createEntityAdapter<ISpeedWorkoutItem>({
  selectId: (speedWorkoutItem) => speedWorkoutItem.tempId,
});

const speedWorkoutItemsSlice = createSlice({
  name: 'speedWorkoutItems',
  initialState: speedWorkoutItemAdapter.getInitialState(),
  reducers: {
    upsertSpeedWorkoutItems: (
      state,
      { payload }: { payload: ISpeedWorkoutItem[] }
    ) => {
      speedWorkoutItemAdapter.upsertMany(state, payload);
    },
  },
});

export const speedWorkoutItemsActions = speedWorkoutItemsSlice.actions;

export default speedWorkoutItemsSlice.reducer;
