import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';

import { speedWorkoutItemsActions } from 'application/speedWorkoutItems/framework/0-reducer';
import { IRemoteSpeedWorkout } from '../core/0-interface';
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
        if (!!speedWorkoutIds.length) return;
        const { speedWorkouts, speedWorkoutItems } =
          await services.api.speedWorkouts.fetchSpeedWorkouts();
        dispatch(
          speedWorkoutItemsActions.upsertSpeedWorkoutItems(speedWorkoutItems)
        );
        dispatch(speedWorkoutsActions.upsertSpeedWorkouts(speedWorkouts));

        return;
      }
      case 'speedWorkoutEditPage/submit': {
        const { workoutId, remoteSpeedWorkout } = action.payload as {
          workoutId: string;
          remoteSpeedWorkout: Omit<IRemoteSpeedWorkout, 'createdAt'>;
        };
        services.api.speedWorkouts.updateSpeedWorkout(
          workoutId,
          remoteSpeedWorkout
        );
        return;
      }
    }
  };

export default [speedWorkoutsMiddleware];
