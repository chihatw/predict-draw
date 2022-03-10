import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../services/context';
import Greeting from './Greeting';
import TalkingToKouSan from './TalkingToKouSan';
import TalkingToLiSan from './TalkingToLiSan';

const ManagementPage: React.FC<{ user: string }> = ({ user }) => {
  const {
    drawn,
    predict,
    yesRatio,
    newGameAt,
    showRatioPane: _showRatioPane,
    showScorePane: _showScorePane,
    liSanPageState,
    kouSanPageState,
    showPredictPane: _showPredictPane,
    handleUpdateDrawn,
    handlePredict,
    handleShowPane,
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

  const [showRatioPane, setShowRatioPane] = useState(_showRatioPane);
  const [showPredictPane, setShowPredictPane] = useState(_showPredictPane);

  useEffect(() => {
    setShowRatioPane(_showRatioPane);
  }, [_showRatioPane]);

  useEffect(() => {
    setShowPredictPane(_showPredictPane);
  }, [_showPredictPane]);

  const handleShowRatioPane = (visible: boolean) => {
    setShowRatioPane(visible);
    handleShowPane({ visible, docId: 'ratioPane' });
  };

  const handleShowPredictPane = (visible: boolean) => {
    setShowPredictPane(visible);
    handleShowPane({ visible, docId: 'predictPane' });
  };

  switch (state) {
    case 'greeting':
      return <Greeting />;
    case 'talkingToLiSan':
      return <TalkingToLiSan />;
    case 'talkingToKouSan':
      return <TalkingToKouSan />;
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          newGameAt={newGameAt}
          superPredict={predict}
          superShowRatioPane={showRatioPane}
          superShowPredictPane={showPredictPane}
          superHandlePredict={handlePredict}
          superHandleShowRatioPane={handleShowRatioPane}
          superHandleShowPredictPane={handleShowPredictPane}
          isManagementMode
        />
      );
    case 'draw':
      return (
        <Draw
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          superDrawn={drawn}
          superHandleDrawn={handleUpdateDrawn}
          isManagementMode
        />
      );
    default:
      return <div>management</div>;
  }
};

export default ManagementPage;
