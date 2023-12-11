import SentencePitchLine from '@/views/components/SentencePitchLine';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';

import { RootState } from 'main';
import { useSelector } from 'react-redux';
import Layout from '../../Layout';

const NotePage = () => {
  const note = useSelector((state: RootState) => state.note);

  return (
    <Layout color='blue' label='單詞'>
      <Container maxWidth='sm'>
        <div style={{ height: 16 }} />
        <Table size='small'>
          <TableBody>
            {note.texts.map((text, index) => (
              <TableRow key={index}>
                <TableCell>
                  <span style={{ fontSize: 24 }}>{text}</span>
                </TableCell>
                <TableCell>
                  <div style={{ transform: 'scale(1.3)' }}>
                    <SentencePitchLine pitchStr={note.pitchStrs[index] || ''} />
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
