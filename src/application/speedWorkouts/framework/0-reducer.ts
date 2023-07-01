import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ISpeedWorkout } from '../core/0-interface';

const speedWorkoutAdapter = createEntityAdapter<ISpeedWorkout>({
  selectId: (speedWorkout) => speedWorkout.id,
});

const speedWorkoutsSlice = createSlice({
  name: 'speedWorkouts',
  initialState: speedWorkoutAdapter.getInitialState(),
  reducers: {
    upsertSpeedWorkouts: (state, { payload }: { payload: ISpeedWorkout[] }) => {
      speedWorkoutAdapter.upsertMany(state, payload);
    },
  },
});

export const speedWorkoutsActions = speedWorkoutsSlice.actions;

export default speedWorkoutsSlice.reducer;
