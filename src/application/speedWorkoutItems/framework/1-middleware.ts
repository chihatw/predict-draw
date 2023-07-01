import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { speedWorkoutEditPageActions } from 'application/speedWorkoutEditPage/framework/0-reducer';
import { ISpeedWorkout } from 'application/speedWorkouts/core/0-interface';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';

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
      default:
    }
  };

export default [speedWorkoutItemsMiddleware];
