import Layout from '../Layout';
import UserPane from '../panes/PaneContainer/UserPane';

const KouSanPage = () => {
  return (
    <Layout color='blue' label='黄さん'>
      <UserPane user='kouSan' />
    </Layout>
  );
};

export default KouSanPage;
