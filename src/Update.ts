import * as R from 'ramda';
import { NoteState, State, Workout } from './Model';

export const ActionTypes = {
  setRounds: 'setRounds',
  setWokout: 'setWorkout',
  setWorkouts: 'setWorkouts',
  setWorkoutId: 'setWorkoutId',
  setNoteState: 'setNoteState',
  setWorkoutTime: 'setWorkoutTime',
  setCheckedIndexes: 'setCheckedIndexes',
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
    case ActionTypes.setNoteState: {
      const noteState = payload as NoteState;
      return R.compose(R.assocPath<NoteState, State>(['note'], noteState))(
        state
      );
    }
    case ActionTypes.setWokout: {
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
    case ActionTypes.setCheckedIndexes: {
      const checkedIndexes = payload as number[];
      return R.compose(
        R.assocPath<number[], State>(
          ['workoutParams', 'checkedIndexes'],
          checkedIndexes
        )
      )(state);
    }
    case ActionTypes.setWorkoutTime: {
      const { time, bpm, isRunning } = payload as {
        time: number;
        bpm: number;
        isRunning: boolean;
      };
      return R.compose(
        R.assocPath<number, State>(['workoutParams', 'time'], time),
        R.assocPath<number, State>(['workoutParams', 'bpm'], bpm),
        R.assocPath<boolean, State>(['workoutParams', 'isRunning'], isRunning)
      )(state);
    }
    case ActionTypes.setRounds: {
      const { totalRounds, currentRound } = payload as {
        totalRounds: number;
        currentRound: number;
      };
      return R.compose(
        R.assocPath<number, State>(
          ['workoutParams', 'totalRounds'],
          totalRounds
        ),
        R.assocPath<number, State>(
          ['workoutParams', 'currentRound'],
          currentRound
        )
      )(state);
    }
    case ActionTypes.setWorkouts: {
      const workouts = payload as Workout[];
      return R.compose(R.assocPath<Workout[], State>(['workouts'], workouts))(
        state
      );
    }
    case ActionTypes.setWorkoutId: {
      const workoutId = payload as string;
      return R.compose(
        R.assocPath<string, State>(['workoutParams', 'workoutId'], workoutId)
      )(state);
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
