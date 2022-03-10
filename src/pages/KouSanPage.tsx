import Layout from '../Layout';
import UserPage from '../components/UserPage';

const KouSanPage = () => {
  return (
    <Layout color='blue' label='黄さん'>
      <UserPage user='kouSan' />
    </Layout>
  );
};

export default KouSanPage;
