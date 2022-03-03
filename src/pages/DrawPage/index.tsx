import React, { useContext } from 'react';

import Layout from '../../components/Layout';
import AppContext from '../../services/context';
import { Draw } from '@chihatw/lang-gym-h.card.page.draw';

const DrawPage = () => {
  const {
    user,
    cards,
    predict,
    liSanPoints,
    kouSanPoints,
    handleLogout,
    handleNavigate,
    handleResult,
  } = useContext(AppContext);

  return (
    <Layout
      user={user}
      buttonLabel='質問する'
      handleLogout={handleLogout}
      handleNavigate={() => handleNavigate('/predict')}
    >
      <Draw
        points={user === 'li-san' ? liSanPoints : kouSanPoints}
        cards={cards}
        predict={predict}
        opponent={user === 'li-san' ? '黄さん' : '李さん'}
        opponentPoints={user === 'li-san' ? kouSanPoints : liSanPoints}
        superHandleResult={handleResult}
      />
    </Layout>
  );
};

export default DrawPage;
