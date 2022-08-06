export const pages = {
  blank: 'blank',
  bpmCalc: 'bpmCalc',
  workoutCue: 'workoutCue',
  workoutRead: 'workoutRead',
};

export type State = {
  liSanPageState: string;
  kouSanPageState: string;
};

export const INITIAL_STATE: State = {
  liSanPageState: pages.blank,
  kouSanPageState: pages.blank,
};

export type PageState = {
  id: string;
  state: string;
};
