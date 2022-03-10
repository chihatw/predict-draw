import {
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import React, { useContext } from 'react';
import Greeting from '../components/Greeting';
import Layout from '../Layout';
import AppContext from '../services/context';
import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';

const NotesPage = () => {
  const { notesPageState: state } = useContext(AppContext);
  return (
    <Layout color='blue' label='單詞'>
      <>
        {(() => {
          switch (state) {
            case 'greeting':
              return <Greeting />;
            case 'pitches':
              return <PitchesPage />;
            default:
              return <></>;
          }
        })()}
      </>
    </Layout>
  );
};

export default NotesPage;

const PitchesPage = () => {
  const { note1PitchList } = useContext(AppContext);
  return (
    <Container maxWidth='sm'>
      <div style={{ height: 16 }} />
      <Table size='small'>
        <TableBody>
          {note1PitchList.map(([label, pitchesArray], index) => (
            <TableRow key={index}>
              <TableCell>
                <span style={{ fontSize: 24 }}>{label}</span>
              </TableCell>
              <TableCell>
                <div style={{ transform: 'scale(1.3)' }}>
                  <SentencePitchLine pitchesArray={pitchesArray} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
