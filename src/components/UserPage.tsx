import React, { useContext, useMemo } from 'react';

import Greeting from './Greeting';
import AppContext from '../services/context';
import BpmTrackPage from '../pages/BpmTrackPage';
import TalkingToLiSan from './TalkingToLiSan';
import TalkingToKouSan from './TalkingToKouSan';
import { Predict } from '../pages/predict';
import { Draw } from '../pages/draw';
import { BpmCulc } from '../pages/bpm-culc';
import ReadTimePractice from './ReadTimePractice';
import ReadTimePerformance from './ReadTimePerformance';
import WriteTimePerformance from './WriteTimePerformance';

const UserPage: React.FC<{ user: string }> = ({ user }) => {
  const {
    yesRatio,
    newGameAt,
    bpmCalcLabel: { label, syllableCount },
    showRatioPane,
    liSanPageState,
    showPredictPane,
    kouSanPageState,
    updateDrawn,
    updatePredict,
    handleStopBpmCalcTiemr,
    handleStartBpmCalcTimer,
  } = useContext(AppContext);

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
      return (
        <BpmCulc
          label={label}
          syllableCount={syllableCount}
          superhandleStop={handleStopBpmCalcTiemr}
          superhandleStart={handleStartBpmCalcTimer}
        />
      );
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          superHandlePredict={updatePredict}
          superShowRatioPane={showRatioPane}
          superShowPredictPane={showPredictPane}
        />
      );
    case 'draw':
      return (
        <Draw
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          superHandleDrawn={updateDrawn}
        />
      );
    case 'bpmTrack':
      return <BpmTrackPage />;
    default:
      return <div></div>;
  }
};

export default UserPage;
