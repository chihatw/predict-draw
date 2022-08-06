import React from 'react';
import Layout from '../Layout';
import MngPane from '../panes/PaneContainer/MngPane';
import { Action } from '../Update';

const MngLiSanPage = () => {
  return (
    <Layout color='red' label='李さん - モニター'>
      <MngPane user='liSan' />
    </Layout>
  );
};

export default MngLiSanPage;
