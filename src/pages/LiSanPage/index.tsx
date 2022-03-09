import { useContext } from 'react';

import Layout from '../../Layout';
import UserPage from '../../components/UserPage';
import AppContext from '../../services/context';

const LisanPage = () => {
  const { liSanPageState } = useContext(AppContext);
  return (
    <Layout user='liSan' label='李さん'>
      <UserPage state={liSanPageState} user='liSan' />
    </Layout>
  );
};

export default LisanPage;
