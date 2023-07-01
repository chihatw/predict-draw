import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { speedWorkoutItemsActions } from 'application/speedWorkoutItems/framework/0-reducer';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';
import { speedWorkoutsActions } from './0-reducer';

const speedWorkoutsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'mngPage/initiate': {
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
    }
  };

export default [speedWorkoutsMiddleware];
