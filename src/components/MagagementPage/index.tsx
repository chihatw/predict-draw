import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../services/context';

const ManagementPage: React.FC<{ state: string; user: string }> = ({
  user,
  state,
}) => {
  const {
    drawn,
    predict,
    yesRatio,
    newGameAt,
    liSanPoints,
    kouSanPoints,
    showRatioPane: _showRatioPane,
    showScorePane: _showScorePane,
    showPredictPane: _showPredictPane,
    handleUpdateDrawn,
    handlePredict,
    handleShowPane,
  } = useContext(AppContext);
  const [showScorePane, setShowScorePane] = useState(_showScorePane);
  const [showRatioPane, setShowRatioPane] = useState(_showRatioPane);
  const [showPredictPane, setShowPredictPane] = useState(_showPredictPane);

  useEffect(() => {
    setShowScorePane(_showScorePane);
  }, [_showScorePane]);

  useEffect(() => {
    setShowRatioPane(_showRatioPane);
  }, [_showRatioPane]);

  useEffect(() => {
    setShowPredictPane(_showPredictPane);
  }, [_showPredictPane]);

  const handleShowScorePane = (visible: boolean) => {
    setShowScorePane(visible);
    handleShowPane({ visible, docId: 'scorePane' });
  };

  const handleShowRatioPane = (visible: boolean) => {
    setShowRatioPane(visible);
    handleShowPane({ visible, docId: 'ratioPane' });
  };

  const handleShowPredictPane = (visible: boolean) => {
    setShowPredictPane(visible);
    handleShowPane({ visible, docId: 'predictPane' });
  };

  switch (state) {
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
