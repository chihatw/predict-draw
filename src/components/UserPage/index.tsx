import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import React, { useContext } from 'react';
import AppContext from '../../services/context';
import Greeting from '../Greeting';

const UserPage: React.FC<{ state: string; user: string }> = ({
  state,
  user,
}) => {
  const {
    yesRatio,
    newGameAt,
    showRatioPane,
    showPredictPane,
    handlePredict,
    handleUpdateDrawn,
  } = useContext(AppContext);
  // TODO stateを増やす。 greeting, talking to 李さん、talking to 黄さん
  switch (state) {
    case 'greeting':
      return <Greeting />;
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
