import { useContext } from 'react';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';

import Layout from '../../Layout';
import AppContext from '../../services/context';

const PredictPage = () => {
  const { user, cards, liSanPoints, kouSanPoints, handlePredict } =
    useContext(AppContext);
  return (
    <Layout user='liSan'>
      <Predict
        cards={cards}
        points={user === 'li-san' ? liSanPoints : kouSanPoints}
        opponent={user === 'li-san' ? '黄さん' : '李さん'}
        opponentPoints={user === 'li-san' ? kouSanPoints : liSanPoints}
        superHandlePredict={handlePredict}
      />
    </Layout>
  );
};

export default PredictPage;
