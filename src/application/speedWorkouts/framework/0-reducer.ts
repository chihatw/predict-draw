import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ISpeedWorkout } from '../core/0-interface';

const speedWorkoutAdapter = createEntityAdapter<ISpeedWorkout>({
  selectId: (speedWorkout) => speedWorkout.id,
});

const speedWorkoutsSlice = createSlice({
  name: 'speedWorkouts',
  initialState: speedWorkoutAdapter.getInitialState(),
  reducers: {
    startFetch: (state) => state,
    upsertMany: (state, { payload }: { payload: ISpeedWorkout[] }) => {
      speedWorkoutAdapter.upsertMany(state, payload);
    },
    upsertOne: (state, { payload }: { payload: ISpeedWorkout }) => {
      speedWorkoutAdapter.upsertOne(state, payload);
    },
  },
});

export const speedWorkoutsActions = speedWorkoutsSlice.actions;

export default speedWorkoutsSlice.reducer;
