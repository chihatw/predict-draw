import { useContext } from 'react';

import Layout from '../../Layout';
import UserPage from '../../components/UserPage';
import AppContext from '../../services/context';

const KouSanPage = () => {
  const { kouSanPageState } = useContext(AppContext);
  return (
    <Layout user='kouSan'>
      <UserPage state={kouSanPageState} user='kouSan' />
    </Layout>
  );
};

export default KouSanPage;
