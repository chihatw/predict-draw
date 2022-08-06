import * as R from 'ramda';
import { State } from './Model';

export const ActionTypes = {
  changeLiSanPageState: 'changeLiSanPageState',
  changeKouSanPageState: 'changeKouSanPageState',
};

export type Action = {
  type: string;
  payload?: string;
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.changeLiSanPageState: {
      const pageState = payload as string;
      return R.compose(
        R.assocPath<string, State>(['liSanPageState'], pageState)
      )(state);
    }
    case ActionTypes.changeKouSanPageState: {
      const pageState = payload as string;
      return R.compose(
        R.assocPath<string, State>(['kouSanPageState'], pageState)
      )(state);
    }
    default:
      return R.compose(R.identity)(state);
  }
};
