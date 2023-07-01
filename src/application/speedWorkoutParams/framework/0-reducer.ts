import { createSlice } from '@reduxjs/toolkit';
import { ISpeedWorkoutParams } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const speedWorkoutParamsSlice = createSlice({
  name: 'speedWorkoutParams',
  initialState,
  reducers: {
    startFetch: (state) => state,
    setParams: (state, { payload }: { payload: ISpeedWorkoutParams }) =>
      payload,
    changeTotalRounds: (state, { payload }: { payload: number }) => {
      state.totalRounds = payload;
    },
    reset: (state) => ({
      ...initialState,
      selectedId: state.selectedId,
      totalRounds: state.totalRounds,
      updatedAt: new Date().getTime(),
    }),
    selectId: (state, { payload }: { payload: string }) => {
      state.selectedId = payload;
    },
    startWorkout: (state) => {
      state.isRunning = true;
    },
    stopWorkout: (state, { payload }: { payload: number }) => {
      state.isRunning = false;
      state.bpm = payload;
    },
  },
});

export const speedWorkoutParamsActions = speedWorkoutParamsSlice.actions;

export default speedWorkoutParamsSlice.reducer;
