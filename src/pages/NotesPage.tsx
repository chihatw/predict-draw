import React from 'react';

import Layout from '../Layout';
import usePitches from '../services/usePitches';
import PitchesPane from '../components/PitchesPane';

const NotesPage = () => {
  const { note1PitchList } = usePitches();
  return (
    <Layout color='blue' label='單詞'>
      <PitchesPane pitchList={note1PitchList} />
    </Layout>
  );
};

export default NotesPage;
