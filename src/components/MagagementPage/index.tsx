import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import React, { useContext } from 'react';
import AppContext from '../../services/context';

const ManagementPage: React.FC<{ state: string; user: string }> = ({
  user,
  state,
}) => {
  const { cards, liSanPoints, kouSanPoints, handlePredict } =
    useContext(AppContext);

  switch (state) {
    case 'predict':
      return (
        <Predict
          cards={cards}
          points={user === 'liSan' ? liSanPoints : kouSanPoints}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          opponentPoints={user === 'liSan' ? kouSanPoints : liSanPoints}
          superHandlePredict={handlePredict}
          superShowScorePane={true}
          superShowRatioPane={true}
          superShowPredictPane={true}
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
