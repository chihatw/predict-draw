import * as R from 'ramda';
import { SpeedWorkoutItem } from '../../Model';

import { WorkoutState } from './Model';

export const WorkoutActionTypes = {
  initialize: 'initialize',
  changeLabel: 'changeLabel',
  changeCueStr: 'changeCueStr',
  changeCueType: 'changeCueType',
  changeBeatCount: 'changeBeatCount',
  changeWorkoutItemStr: 'changeWorkoutItemStr',
};

export type WorkoutAction = {
  type: string;
  payload?:
    | string
    | WorkoutState
    | number
    | { cues: string[]; cueStr: string }
    | {
        workoutItemStr: string;
        workoutItems: SpeedWorkoutItem[];
        beatCount: number;
        cues: string[];
        cueStr: string;
      };
};

export const workoutReducer = (
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState => {
  const { type, payload } = action;
  switch (type) {
    case WorkoutActionTypes.changeCueStr: {
      const { cueStr, cues } = payload as { cues: string[]; cueStr: string };
      return R.compose(
        R.assocPath<string, WorkoutState>(['cueStr'], cueStr),
        R.assocPath<string[], WorkoutState>(['cues'], cues)
      )(state);
    }
    case WorkoutActionTypes.changeCueType: {
      const cueType = payload as string;
      return R.compose(R.assocPath<string, WorkoutState>(['cueType'], cueType))(
        state
      );
    }
    case WorkoutActionTypes.changeWorkoutItemStr: {
      const { workoutItemStr, workoutItems, beatCount, cueStr, cues } =
        payload as {
          cues: string[];
          cueStr: string;
          beatCount: number;
          workoutItems: SpeedWorkoutItem[];
          workoutItemStr: string;
        };
      return R.compose(
        R.assocPath<string[], WorkoutState>(['cues'], cues),
        R.assocPath<string, WorkoutState>(['cueStr'], cueStr),
        R.assocPath<number, WorkoutState>(['beatCount'], beatCount),
        R.assocPath<string, WorkoutState>(['workoutItemStr'], workoutItemStr),
        R.assocPath<SpeedWorkoutItem[], WorkoutState>(
          ['workoutItems'],
          workoutItems
        )
      )(state);
    }
    case WorkoutActionTypes.changeLabel: {
      const label = payload as string;
      return R.compose(R.assocPath<string, WorkoutState>(['label'], label))(
        state
      );
    }
    case WorkoutActionTypes.changeBeatCount: {
      const beatCount = payload as number;
      return R.compose(
        R.assocPath<number, WorkoutState>(['beatCount'], beatCount)
      )(state);
    }
    case WorkoutActionTypes.initialize: {
      const initialState = payload as WorkoutState;
      return initialState;
    }
    default:
      return R.compose(R.identity)(state);
  }
};
