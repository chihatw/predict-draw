import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { ISpeedWorkoutEditPage } from 'application/speedWorkoutEditPage/core/0-interface';
import { speedWorkoutEditPageActions } from 'application/speedWorkoutEditPage/framework/0-reducer';
import { ISpeedWorkout } from 'application/speedWorkouts/core/0-interface';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';
import { speedWorkoutItemsActions } from './0-reducer';

const speedWorkoutItemsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'speedWorkoutEditPage/initiate': {
        const workout = action.payload as ISpeedWorkout;
        const workoutItems = (getState() as RootState).speedWorkoutItems
          .entities;

        const targetWorkoutItems = workout.itemTempIds.map(
          (tempId) => workoutItems[tempId]!
        );
        dispatch(
          speedWorkoutEditPageActions.setWorkoutItems(targetWorkoutItems)
        );
        return;
      }
      case 'speedWorkoutEditPage/submit': {
        const workouts = (getState() as RootState).speedWorkouts.entities;
        const { workoutId, speedWorkoutEditPage } = action.payload as {
          workoutId: string;
          speedWorkoutEditPage: ISpeedWorkoutEditPage;
        };

        const workout = workouts[workoutId];
        if (!workout) return;
        const itemTempIds = workout.itemTempIds;
        dispatch(speedWorkoutItemsActions.removeMany(itemTempIds));
        dispatch(
          speedWorkoutItemsActions.upsertMany(speedWorkoutEditPage.workoutItems)
        );
        return;
      }
      default:
    }
  };

export default [speedWorkoutItemsMiddleware];
