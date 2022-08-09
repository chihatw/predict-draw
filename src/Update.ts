import * as R from 'ramda';
import {
  NoteState,
  RandomWorkout,
  State,
  Workout,
  WorkoutParams,
} from './Model';

export const ActionTypes = {
  setWorkout: 'setWorkout',
  setWorkouts: 'setWorkouts',
  setNoteState: 'setNoteState',
  setWorkoutParams: 'setWorkoutParams',
  setRandomWorkouts: 'setRandomWorkouts',
  setLiSanPageState: 'setLiSanPageState',
  setKouSanPageState: 'setKouSanPageState',
};

export type Action = {
  type: string;
  payload?:
    | string
    | number
    | number[]
    | Workout
    | Workout[]
    | NoteState
    | WorkoutParams
    | RandomWorkout
    | { [workoutId: string]: RandomWorkout }
    | {
        totalRounds: number;
        currentRound: number;
      }
    | {
        time: number;
        bpm: number;
        isRunning: boolean;
      };
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  const { workouts } = state;

  switch (type) {
    case ActionTypes.setRandomWorkouts: {
      const randomWorkouts = payload as { [workoutId: string]: RandomWorkout };
      return R.compose(
        R.assocPath<{ [workoutId: string]: RandomWorkout }, State>(
          ['randomWorkout', 'workouts'],
          randomWorkouts
        )
      )(state);
    }
    case ActionTypes.setWorkoutParams: {
      const workoutParams = payload as WorkoutParams;
      return R.compose(
        R.assocPath<WorkoutParams, State>(['workoutParams'], workoutParams)
      )(state);
    }
    case ActionTypes.setNoteState: {
      const noteState = payload as NoteState;
      return R.compose(R.assocPath<NoteState, State>(['note'], noteState))(
        state
      );
    }
    case ActionTypes.setWorkout: {
      const workout = payload as Workout;
      let updatedList = [...workouts];
      const isCreateNew = !updatedList.find((item) => item.id === workout.id);
      if (isCreateNew) {
        updatedList.unshift(workout);
      } else {
        updatedList = updatedList.map((item) =>
          item.id === workout.id ? workout : item
        );
      }

      return R.compose(
        R.assocPath<Workout[], State>(['workouts'], updatedList)
      )(state);
    }
    case ActionTypes.setWorkouts: {
      const workouts = payload as Workout[];
      return R.compose(R.assocPath<Workout[], State>(['workouts'], workouts))(
        state
      );
    }
    case ActionTypes.setLiSanPageState: {
      const pageState = payload as string;
      return R.compose(
        R.assocPath<string, State>(['liSanPageState'], pageState)
      )(state);
    }
    case ActionTypes.setKouSanPageState: {
      const pageState = payload as string;
      return R.compose(
        R.assocPath<string, State>(['kouSanPageState'], pageState)
      )(state);
    }
    default:
      return R.compose(R.identity)(state);
  }
};
