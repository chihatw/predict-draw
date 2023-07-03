import { Clear } from '@mui/icons-material';
import { TableCell, TableRow } from '@mui/material';
import { ICuePattern } from 'application/cuePattern/core/0-interface';
import { TARGET } from 'application/cuePattern/core/1-constants';

function PatternRow({
  index,
  pattern,
}: {
  index: number;
  pattern: ICuePattern;
}) {
  const topicCell =
    pattern.topic === TARGET.none ? (
      <Clear sx={{ fontSize: 12 }} />
    ) : pattern.topic === TARGET.wo ? (
      'ヲ格'
    ) : (
      'ニ格'
    );
  const groupingCell =
    pattern.grouping === TARGET.none ? (
      <Clear sx={{ fontSize: 12 }} />
    ) : pattern.grouping === TARGET.wo ? (
      'ヲ格'
    ) : (
      'ニ格'
    );
  return (
    <TableRow>
      <TableCell padding='none'>{index + 1}</TableCell>
      <TableCell>{pattern.sentence}</TableCell>
      <TableCell align='center'>{topicCell}</TableCell>
      <TableCell align='center'>{groupingCell}</TableCell>
      <TableCell align='center'>{pattern.isWoFirst ? '正' : '逆'}</TableCell>
      <TableCell align='center'>{pattern.isNegative ? '否' : '肯'}</TableCell>
    </TableRow>
  );
}

export default PatternRow;
