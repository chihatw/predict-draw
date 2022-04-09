import Layout from '../Layout';
import ManagementPage from '../components/ManagementPane';

const ManageLiSanPage = () => {
  return (
    <Layout color='red' label='李さん - モニター'>
      <ManagementPage user='liSan' />
    </Layout>
  );
};

export default ManageLiSanPage;
