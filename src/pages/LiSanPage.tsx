import Layout from '../Layout';
import UserPageSwitcher from '../components/UserPageSwitcher';

const LisanPage = () => {
  return (
    <Layout color='red' label='李さん'>
      <UserPageSwitcher user='liSan' />
    </Layout>
  );
};

export default LisanPage;
