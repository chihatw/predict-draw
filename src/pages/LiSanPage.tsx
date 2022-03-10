import Layout from '../Layout';
import UserPage from '../components/UserPage';

const LisanPage = () => {
  return (
    <Layout color='red' label='李さん'>
      <UserPage user='liSan' />
    </Layout>
  );
};

export default LisanPage;
