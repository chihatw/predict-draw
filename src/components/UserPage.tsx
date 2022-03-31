import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { BpmCulc } from '@chihatw/lang-gym-h.card.page.bpm-culc';
import React, { useContext, useMemo } from 'react';

import noImage from '../images/keitai.png';
import Greeting from './Greeting';
import yesImage from '../images/suimin.png';
import AppContext from '../services/context';
import BpmTrackPage from '../pages/BpmTrackPage';
import TalkingToLiSan from './TalkingToLiSan';
import TalkingToKouSan from './TalkingToKouSan';
import { Predict } from '../pages/predict';

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
          noImage={noImage}
          yesImage={yesImage}
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
          noImage={noImage}
          yesImage={yesImage}
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
