import React from 'react';

import Layout from '../Layout';
import usePitches from '../services/usePitches';
import NotePane from '../panes/Note/NotePane';

const NotePage = () => {
  const { note1PitchList } = usePitches();
  return (
    <Layout color='blue' label='單詞'>
      <NotePane pitchList={note1PitchList} />
    </Layout>
  );
};

export default NotePage;
