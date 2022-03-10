import Layout from '../Layout';
import ManagementPage from '../components/ManagementPage';

const ManageKouSanPage = () => {
  return (
    <Layout color='blue' label='黄さん - モニター'>
      <ManagementPage user='kouSan' />
    </Layout>
  );
};

export default ManageKouSanPage;
