import { Services } from '@/infrastructure/services';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { RootState } from 'main';

import { ISpeedWorkoutEditPage } from '@/application/speedWorkoutEditPage/core/0-interface';
import {
    buildRemoteSpeedWorkout,
    buildSpeedWorkout,
} from '@/application/speedWorkoutEditPage/core/2-services';
import { speedWorkoutItemsActions } from '@/application/speedWorkoutItems/framework/0-reducer';
import { speedWorkoutsActions } from './0-reducer';

const speedWorkoutsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'speedWorkouts/startFetch': {
        const speedWorkoutIds = (getState() as RootState).speedWorkouts.ids;
        console.log(speedWorkoutIds);
        if (!!speedWorkoutIds.length) return;
        const { speedWorkouts, speedWorkoutItems } =
          await services.api.speedWorkouts.fetchSpeedWorkouts();
        dispatch(speedWorkoutItemsActions.upsertMany(speedWorkoutItems));
        dispatch(speedWorkoutsActions.upsertMany(speedWorkouts));

        return;
      }
      case 'speedWorkoutEditPage/submit': {
        const { workoutId, speedWorkoutEditPage } = action.payload as {
          workoutId: string;
          speedWorkoutEditPage: ISpeedWorkoutEditPage;
        };
        const speedWorkout = buildSpeedWorkout(workoutId, speedWorkoutEditPage);
        dispatch(speedWorkoutsActions.upsertOne(speedWorkout));

        const remoteSpeedWorkout =
          buildRemoteSpeedWorkout(speedWorkoutEditPage);
        services.api.speedWorkouts.updateSpeedWorkout(
          workoutId,
          remoteSpeedWorkout
        );
        return;
      }
    }
  };

export default [speedWorkoutsMiddleware];
