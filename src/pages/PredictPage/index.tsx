import { useContext } from 'react';

import Layout from '../../components/Layout';
import AppContext from '../../services/context';

const PredictPage = () => {
  const { user, handleLogout, handleNavigate } = useContext(AppContext);
  return (
    <Layout
      user={user}
      buttonLabel='返答する'
      handleLogout={handleLogout}
      handleNavigate={() => handleNavigate('/draw')}
    >
      PredictPage
    </Layout>
  );
};

export default PredictPage;
