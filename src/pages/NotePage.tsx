import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import {
  Table,
  TableRow,
  Container,
  TableBody,
  TableCell,
} from '@mui/material';
import React, { useContext } from 'react';
import string2PitchesArray from 'string2pitches-array';

import Layout from '../Layout';
import AppContext from '../services/context';

const NotePage = () => {
  const { state } = useContext(AppContext);
  const { note } = state;
  const { texts, pitches } = note;
  return (
    <Layout color='blue' label='單詞'>
      <Container maxWidth='sm'>
        <div style={{ height: 16 }} />
        <Table size='small'>
          <TableBody>
            {texts.map((text, index) => (
              <TableRow key={index}>
                <TableCell>
                  <span style={{ fontSize: 24 }}>{text}</span>
                </TableCell>
                <TableCell>
                  <div style={{ transform: 'scale(1.3)' }}>
                    <SentencePitchLine
                      pitchesArray={string2PitchesArray(pitches[index] || '')}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Layout>
  );
};

export default NotePage;
