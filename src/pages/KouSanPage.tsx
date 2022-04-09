import Layout from '../Layout';
import PaneSwitcher from '../components/PaneSwitcher';

const KouSanPage = () => {
  return (
    <Layout color='blue' label='黄さん'>
      <PaneSwitcher user='kouSan' />
    </Layout>
  );
};

export default KouSanPage;
