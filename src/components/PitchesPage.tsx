import {
  Table,
  TableRow,
  Container,
  TableBody,
  TableCell,
} from '@mui/material';
import { SentencePitchLine } from '@chihatw/lang-gym-h.ui.sentence-pitch-line';

const PitchesPage = ({
  pitchList,
}: {
  pitchList: [string, string[][][]][];
}) => (
  <Container maxWidth='sm'>
    <div style={{ height: 16 }} />
    <Table size='small'>
      <TableBody>
        {pitchList.map(([label, pitchesArray], index) => (
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

export default PitchesPage;