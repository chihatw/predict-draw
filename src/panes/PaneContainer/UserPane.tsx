import React, { useContext, useMemo } from 'react';

import Greeting from '../Greeting';
import AppContext from '../../services/context';
import { BpmCulc } from '../BpmCalcPane';
import WorkoutCuePane from '../WorkoutItems/WorkoutCuePane';
import WorkoutReadPane from '../WorkoutItems/WorkoutReadPane';

const UserPane: React.FC<{ user: string }> = ({ user }) => {
  const { state } = useContext(AppContext);

  const { liSanPageState, kouSanPageState } = state;

  const _state = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [user, liSanPageState, kouSanPageState]);

  switch (_state) {
    case 'greeting':
      return <Greeting />;
    case 'bpmCalc':
      return <BpmCulc />;
    case 'workoutCue':
      return <WorkoutCuePane />;
    case 'workoutRead':
      return <WorkoutReadPane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
