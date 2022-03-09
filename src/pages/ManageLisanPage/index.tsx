import React, { useContext } from 'react';
import ManagementPage from '../../components/MagagementPage';

import Layout from '../../Layout';
import AppContext from '../../services/context';

const ManageLiSanPage = () => {
  const { liSanPageState } = useContext(AppContext);
  return (
    <Layout user='liSan' label='李さん - Monitor'>
      <ManagementPage state={liSanPageState} user='liSan' />
    </Layout>
  );
};

export default ManageLiSanPage;
