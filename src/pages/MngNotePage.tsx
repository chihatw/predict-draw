import React from 'react';

import Layout from '../Layout';
import MngNotePane from '../panes/Note/MngNotePane';

const MngNotePage = () => {
  return (
    <Layout color='blue' label='Input Pitches'>
      <MngNotePane />
    </Layout>
  );
};

export default MngNotePage;
