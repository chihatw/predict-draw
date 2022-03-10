import React, { useContext } from 'react';
import Greeting from '../components/Greeting';
import Layout from '../Layout';
import AppContext from '../services/context';

const NotesPage = () => {
  const { notesPageState: state } = useContext(AppContext);
  return (
    <Layout color='blue' label='筆記'>
      <>
        {(() => {
          switch (state) {
            case 'greeting':
              return <Greeting />;
            case 'pitches':
              return <div>pitches</div>;
            default:
              return <></>;
          }
        })()}
      </>
    </Layout>
  );
};

export default NotesPage;
