import * as R from 'ramda';
import { Cue } from '../../../Model';
import { RandomWorkoutEditState } from './Model';

export const RandomWorkoutActionTypes = {
  initialize: 'initialize',
  changeTitle: 'changeTitle',
  changeCuesStr: 'changeCuesStr',
  changeImagePath: 'changeImagePath',
  changeTargetBpm: 'changeTargetBpm',
  changeRoundCount: 'changeRoundCount',
};

export type RandomWorkoutEditAction = {
  type: string;
  payload?:
    | string
    | number
    | RandomWorkoutEditState
    | { imagePath: string; cueIndex: number }
    | { beatCount: number; cues: Cue[]; cuesStr: string };
};

export const randomWorkoutEditReducer = (
  state: RandomWorkoutEditState,
  action: RandomWorkoutEditAction
): RandomWorkoutEditState => {
  const { type, payload } = action;
  switch (type) {
    case RandomWorkoutActionTypes.initialize: {
      const initialState = payload as RandomWorkoutEditState;
      return initialState;
    }
    case RandomWorkoutActionTypes.changeImagePath: {
      const { imagePath, cueIndex } = payload as {
        imagePath: string;
        cueIndex: number;
      };
      return R.compose(
        R.assocPath<string, RandomWorkoutEditState>(
          ['cues', cueIndex, 'imagePath'],
          imagePath
        )
      )(state);
    }
    case RandomWorkoutActionTypes.changeCuesStr: {
      const { beatCount, cues, cuesStr } = payload as {
        beatCount: number;
        cues: Cue[];
        cuesStr: string;
      };
      return R.compose(
        R.assocPath<Cue[], RandomWorkoutEditState>(['cues'], cues),
        R.assocPath<number, RandomWorkoutEditState>(['beatCount'], beatCount),
        R.assocPath<string, RandomWorkoutEditState>(['cuesStr'], cuesStr)
      )(state);
    }
    case RandomWorkoutActionTypes.changeRoundCount: {
      const roundCount = payload as number;
      return R.compose(
        R.assocPath<number, RandomWorkoutEditState>(['roundCount'], roundCount)
      )(state);
    }
    case RandomWorkoutActionTypes.changeTargetBpm: {
      const targetBpm = payload as number;
      return R.compose(
        R.assocPath<number, RandomWorkoutEditState>(['targetBpm'], targetBpm)
      )(state);
    }
    case RandomWorkoutActionTypes.changeTitle: {
      const title = payload as string;
      return R.compose(
        R.assocPath<string, RandomWorkoutEditState>(['title'], title)
      )(state);
    }
    default:
      return R.compose(R.identity)(state);
  }
};
