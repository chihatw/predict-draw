import React, { useContext, useMemo } from 'react';

import Greeting from './Greeting';
import { Draw } from './PredictDraw/DrawPane';
import TalkingTo from './TalkingTo';
import AppContext from '../services/context';
import { BpmCulc } from './BpmCalcPane';
import BpmTrackPane from './BpmTrakPane';
import { PredictPane } from './PredictDraw/PredictPane';
import ReadTimePractice from './ReadWriteTime/ReadTimePractice';
import ReadTimePerformance from './ReadWriteTime/ReadTimePerformance';
import WriteTimePerformance from './ReadWriteTime/WriteTimePerformance';

const UserPageSwitcher: React.FC<{ user: string }> = ({ user }) => {
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
    default:
      return <div></div>;
  }
};

export default UserPageSwitcher;
