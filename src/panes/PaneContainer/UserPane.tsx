import React, { useContext, useMemo } from 'react';

import Greeting from '../Greeting';
import { Draw } from '../PredictDraw/PredictDrawPane/DrawPane';
import TalkingTo from '../TalkingTo';
import AppContext from '../../services/context';
import { BpmCulc } from '../BpmCalcPane';
import BpmTrackPane from '../BPMTrack/BpmTrackPane';
import { PredictPane } from '../PredictDraw/PredictDrawPane/PredictPane';
import WorkoutItemsPane from '../WorkoutItems/WorkoutItemsPane';
import ReadTimePractice from '../ReadWriteTime/ReadWriteTimePane/ReadTimePractice';
import ReadTimePerformance from '../ReadWriteTime/ReadWriteTimePane/ReadTimePerformance';
import WriteTimePerformance from '../ReadWriteTime/ReadWriteTimePane/WriteTimePerformance';
import WorkoutItemsPlayerPane from '../WorkoutItems/WorkoutItemsPlayerPane';

const UserPane: React.FC<{ user: string }> = ({ user }) => {
  const { liSanPageState, kouSanPageState } = useContext(AppContext);

  const state = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [user, liSanPageState, kouSanPageState]);

  switch (state) {
    case 'readTimePractice':
      return <ReadTimePractice />;
    case 'readTimePerformance':
      return <ReadTimePerformance />;
    case 'writeTimePerformance':
      return <WriteTimePerformance />;
    case 'greeting':
      return <Greeting />;
    case 'talkingToLiSan':
      return <TalkingTo name='李桑' />;
    case 'talkingToKouSan':
      return <TalkingTo name='黄桑' />;
    case 'bpmCalc':
      return <BpmCulc />;
    case 'predict':
      return <PredictPane opponent={user === 'liSan' ? '黄さん' : '李さん'} />;
    case 'draw':
      return <Draw />;
    case 'bpmTrack':
      return <BpmTrackPane />;
    case 'workoutItems':
      return <WorkoutItemsPane />;
    case 'workoutItemsPlayer':
      return <WorkoutItemsPlayerPane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
