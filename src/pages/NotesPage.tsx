import React from 'react';

import Layout from '../Layout';
import usePitches from '../services/usePitches';
import PitchesPage from '../components/PitchesPage';

const NotesPage = () => {
  const { note1PitchList } = usePitches();
  return (
    <Layout color='blue' label='單詞'>
      <PitchesPage pitchList={note1PitchList} />
    </Layout>
  );
};

export default NotesPage;
