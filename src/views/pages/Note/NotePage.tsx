import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useContext } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';

import { AppContext } from '../../../App';
import Layout from '../../../Layout';

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
                    <SentencePitchLine pitchStr={pitches[index] || ''} />
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
