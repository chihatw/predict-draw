import Layout from '../Layout';
import MngPane from '../panes/MngPane';

const MngLiSanPage = () => {
  return (
    <Layout color='red' label='李さん - モニター'>
      <MngPane user='liSan' />
    </Layout>
  );
};

export default MngLiSanPage;
