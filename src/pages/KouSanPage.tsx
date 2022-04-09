import Layout from '../Layout';
import UserPageSwitcher from '../components/UserPageSwitcher';

const KouSanPage = () => {
  return (
    <Layout color='blue' label='黄さん'>
      <UserPageSwitcher user='kouSan' />
    </Layout>
  );
};

export default KouSanPage;
