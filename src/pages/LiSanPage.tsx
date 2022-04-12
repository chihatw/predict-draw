import Layout from '../Layout';
import UserPane from '../panes/PaneContainer/UserPane';

const LisanPage = () => {
  return (
    <Layout color='red' label='李さん'>
      <UserPane user='liSan' />
    </Layout>
  );
};

export default LisanPage;
