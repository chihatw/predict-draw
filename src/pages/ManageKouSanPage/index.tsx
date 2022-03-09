import { useContext } from 'react';

import Layout from '../../Layout';
import AppContext from '../../services/context';
import ManagementPage from '../../components/MagagementPage';

const ManageKouSanPage = () => {
  const { kouSanPageState } = useContext(AppContext);
  return (
    <Layout user='kouSan' label='黄さん - モニター'>
      <ManagementPage state={kouSanPageState} user='kouSan' />
    </Layout>
  );
};

export default ManageKouSanPage;
