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
        opponentPoints={user === 'li-san' ? kouSanPoints : liSanPoints}
        opponent={user === 'li-san' ? '黄さん' : '李さん'}
      />
    </Layout>
  );
};

export default DrawPage;
