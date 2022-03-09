import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import React, { useContext } from 'react';
import AppContext from '../../services/context';

const UserPage: React.FC<{ state: string; user: string }> = ({
  state,
  user,
}) => {
  const {
    yesRatio,
    newGameAt,
    liSanPoints,
    kouSanPoints,
    showScorePane,
    showRatioPane,
    showPredictPane,
    handlePredict,
    handleUpdateDrawn,
  } = useContext(AppContext);
  switch (state) {
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          superHandlePredict={handlePredict}
          superShowRatioPane={showRatioPane}
          superShowPredictPane={showPredictPane}
        />
      );
    case 'draw':
      return (
        <Draw
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          superHandleDrawn={handleUpdateDrawn}
        />
      );
    default:
      return <div></div>;
  }
};

export default UserPage;
