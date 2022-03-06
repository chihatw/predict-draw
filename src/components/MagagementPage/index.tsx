import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../services/context';

const ManagementPage: React.FC<{ state: string; user: string }> = ({
  user,
  state,
}) => {
  const {
    cards,
    predict,
    liSanPoints,
    kouSanPoints,
    showRatioPane: _showRatioPane,
    showScorePane: _showScorePane,
    showPredictPane: _showPredictPane,
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
    handleShowPane({ visible, docId: 'showScorePane' });
  };

  const handleShowRatioPane = (visible: boolean) => {
    setShowRatioPane(visible);
    handleShowPane({ visible, docId: 'showRatioPane' });
  };

  const handleShowPredictPane = (visible: boolean) => {
    setShowPredictPane(visible);
    handleShowPane({ visible, docId: 'showPredictPane' });
  };

  switch (state) {
    case 'predict':
      return (
        <Predict
          cards={cards}
          points={user === 'liSan' ? liSanPoints : kouSanPoints}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          superPredict={predict}
          opponentPoints={user === 'liSan' ? kouSanPoints : liSanPoints}
          superShowScorePane={showScorePane}
          superShowRatioPane={showRatioPane}
          superShowPredictPane={showPredictPane}
          superHandlePredict={handlePredict}
          superHandleShowScorePane={handleShowScorePane}
          superHandleShowRatioPane={handleShowRatioPane}
          superHandleShowPredictPane={handleShowPredictPane}
          isManagementMode
        />
      );
    case 'draw':
      return <div>management draw</div>;
    default:
      return <div>management</div>;
  }
};

export default ManagementPage;
