import { createSlice } from '@reduxjs/toolkit';
import { ISpeedWorkoutItem } from 'application/speedWorkoutItems/core/0-interface';
import { calcBeatCount } from 'application/speedWorkoutItems/core/2-services';
import { ISpeedWorkout } from 'application/speedWorkouts/core/0-interface';
import { ISpeedWorkoutEditPage } from '../core/0-interface';
import { initialState } from '../core/1-constants';

const speedWorkoutEditPageSlice = createSlice({
  name: 'speedWorkoutEditPage',
  initialState: initialState,
  reducers: {
    initiate: (state, { payload }: { payload: ISpeedWorkout }) => {
      state.cueType = payload.cueType;
      state.label = payload.label;
    },
    setWorkoutItems: (state, { payload }: { payload: ISpeedWorkoutItem[] }) => {
      state.beatCount = calcBeatCount(payload);
      state.workoutItems = payload;
    },
    changeLabel: (state, { payload }: { payload: string }) => {
      state.label = payload;
    },
    changeCueType: (state, { payload }: { payload: string }) => {
      state.cueType = payload;
    },
    //
    submit: (
      state,
      {
        payload,
      }: {
        payload: {
          workoutId: string;
          speedWorkoutEditPage: ISpeedWorkoutEditPage;
        };
      }
    ) => state,
    // submit: (
    //   state,
    //   {
    //     payload,
    //   }: {
    //     payload: {
    //       workoutId: string;
    //       remoteSpeedWorkout: Omit<IRemoteSpeedWorkout, 'createdAt'>;
    //     };
    //   }
    // ) => state,
  },
});

export const speedWorkoutEditPageActions = speedWorkoutEditPageSlice.actions;

export default speedWorkoutEditPageSlice.reducer;
