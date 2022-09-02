import * as R from 'ramda';
import { SpeedWorkoutState } from './Model';

export const SpeedWorkoutActionTypes = {
  setState: 'setState',
  setMiliSeconds: 'setMiliSeconds',
};

export type SpeedWorkoutAction = {
  type: string;
  payload: SpeedWorkoutState | number;
};

export const speedReadingReducer = (
  state: SpeedWorkoutState,
  action: SpeedWorkoutAction
) => {
  const { type, payload } = action;
  switch (type) {
    case SpeedWorkoutActionTypes.setMiliSeconds:
      const miliSeconds = payload as number;
      return R.assocPath<number, SpeedWorkoutState>(
        ['miliSeconds'],
        miliSeconds
      )(state);
    default:
      return payload as SpeedWorkoutState;
  }
};
