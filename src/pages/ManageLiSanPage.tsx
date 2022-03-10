import Layout from '../Layout';
import ManagementPage from '../components/ManagementPage';

const ManageLiSanPage = () => {
  return (
    <Layout color='red' label='李さん - Monitor'>
      <ManagementPage user='liSan' />
    </Layout>
  );
};

export default ManageLiSanPage;
