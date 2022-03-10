import { useContext } from 'react';

import Layout from '../Layout';
import Greeting from '../components/Greeting';
import AppContext from '../services/context';
import PitchesPage from '../components/PitchesPage';

const NotesPage = () => {
  const { notesPageState: state } = useContext(AppContext);
  const { note1PitchList } = useContext(AppContext);
  return (
    <Layout color='blue' label='單詞'>
      <>
        {(() => {
          switch (state) {
            case 'greeting':
              return <Greeting />;
            case 'pitches':
              return <PitchesPage pitchList={note1PitchList} />;
            default:
              return <></>;
          }
        })()}
      </>
    </Layout>
  );
};

export default NotesPage;
