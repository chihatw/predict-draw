import React, { useContext, useMemo } from 'react';

import Greeting from './Greeting';
import AppContext from '../services/context';
import BpmTrackPage from '../pages/BpmTrackPage';
import TalkingToLiSan from './TalkingToLiSan';
import TalkingToKouSan from './TalkingToKouSan';
import { Predict } from '../pages/predict';
import { Draw } from './DrawPane';
import { BpmCulc } from './BpmCalcPane';
import ReadTimePractice from './ReadWriteTime/ReadTimePractice';
import ReadTimePerformance from './ReadWriteTime/ReadTimePerformance';
import WriteTimePerformance from './ReadWriteTime/WriteTimePerformance';
import usePredict from '../services/usePredict';

const UserPage: React.FC<{ user: string }> = ({ user }) => {
  const { liSanPageState, kouSanPageState } = useContext(AppContext);

  const { yesRatio, newGameAt, updatePredict } = usePredict();

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
      return <TalkingToLiSan />;
    case 'talkingToKouSan':
      return <TalkingToKouSan />;
    case 'bpmCalc':
      return <BpmCulc />;
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          superHandlePredict={updatePredict}
        />
      );
    case 'draw':
      return <Draw />;
    case 'bpmTrack':
      return <BpmTrackPage />;
    default:
      return <div></div>;
  }
};

export default UserPage;
