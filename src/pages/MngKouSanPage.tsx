import Layout from '../Layout';
import MngPane from '../panes/PaneContainer/MngPane';

const MngKouSanPage = () => {
  return (
    <Layout color='blue' label='黄さん - モニター'>
      <MngPane user='kouSan' />
    </Layout>
  );
};

export default MngKouSanPage;
