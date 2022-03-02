import React, { useContext } from 'react';
import { AppContext } from '../../App';
import Layout from '../../components/Layout';

const DrawPage = () => {
  const { user, handleLogout, handleNavigate } = useContext(AppContext);
  return (
    <Layout
      user={user}
      buttonLabel='質問する'
      handleLogout={handleLogout}
      handleNavigate={() => handleNavigate('/predict')}
    >
      DrawPage
    </Layout>
  );
};

export default DrawPage;
