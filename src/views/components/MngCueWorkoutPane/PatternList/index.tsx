import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';

import { PATTERNS } from '@/application/cuePattern/core/1-constants';
import { buildCurrentPatterns } from '@/application/cuePattern/core/2-services';
import PatternListSwitchesPane from './PatternListSwitchesPane';
import PatternRow from './PatternRow';

const PatternList = () => {
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams
  );

  const tableContent = buildCurrentPatterns(PATTERNS, cuePatternParams).map(
    (pattern, index) => (
      <PatternRow key={index} index={index} pattern={pattern} />
    )
  );

  return (
    <div>
      <PatternListSwitchesPane />
      <Table size='small' sx={{ marginBottom: 8 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>例文</TableCell>
            <TableCell align='center'>主題</TableCell>
            <TableCell align='center'>分類</TableCell>
            <TableCell align='center'>格順</TableCell>
            <TableCell align='center'>肯否</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableContent}</TableBody>
      </Table>
    </div>
  );
};

export default PatternList;
