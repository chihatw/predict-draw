import { useContext } from 'react';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';

import Layout from '../../components/Layout';
import AppContext from '../../services/context';

const PredictPage = () => {
  const {
    user,
    cards,
    liSanPoints,
    kouSanPoints,
    handleLogout,
    handlePredict,
    handleNavigate,
  } = useContext(AppContext);
  return (
    <Layout
      user={user}
      buttonLabel='返答する'
      handleLogout={handleLogout}
      handleNavigate={() => handleNavigate('/draw')}
    >
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
