import Layout from '../Layout';
import PaneSwitcher from '../components/PaneSwitcher';

const LisanPage = () => {
  return (
    <Layout color='red' label='李さん'>
      <PaneSwitcher user='liSan' />
    </Layout>
  );
};

export default LisanPage;
