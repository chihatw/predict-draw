import React, { useContext } from 'react';

import Layout from '../../Layout';
import AppContext from '../../services/context';
import { Draw } from '@chihatw/lang-gym-h.card.page.draw';

const DrawPage = () => {
  const { user, cards, predict, liSanPoints, kouSanPoints, handleResult } =
    useContext(AppContext);

  return (
    <Layout user='liSan'>
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
