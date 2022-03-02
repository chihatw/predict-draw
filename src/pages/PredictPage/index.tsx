import { useContext } from 'react';
import { AppContext } from '../../App';
import Layout from '../../components/Layout';

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
