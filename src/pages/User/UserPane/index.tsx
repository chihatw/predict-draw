import React, { useContext } from 'react';
import { pages } from '../../../Model';
import AppContext from '../../../services/context';
import { BpmCulc } from './BpmCalcPane';
import WorkoutCuePane from './WorkoutCuePane';
import WorkoutReadPane from './WorkoutReadPane';

const UserPane = ({ user }: { user: string }) => {
  const { state } = useContext(AppContext);
  const { liSanPageState, kouSanPageState } = state;
  const pageState = user === 'liSan' ? liSanPageState : kouSanPageState;
  switch (pageState) {
    case pages.bpmCalc:
      return <BpmCulc />;
    case pages.workoutCue:
      return <WorkoutCuePane />;
    case pages.workoutRead:
      return <WorkoutReadPane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
