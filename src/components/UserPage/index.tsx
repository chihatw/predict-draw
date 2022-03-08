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
  } = useContext(AppContext);
  switch (state) {
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          points={user === 'liSan' ? liSanPoints : kouSanPoints}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          opponentPoints={user === 'liSan' ? kouSanPoints : liSanPoints}
          superHandlePredict={handlePredict}
          superShowScorePane={showScorePane}
          superShowRatioPane={showRatioPane}
          superShowPredictPane={showPredictPane}
        />
      );
    case 'draw':
      return <div>draw</div>;
    default:
      return <div></div>;
  }
};

export default UserPage;
