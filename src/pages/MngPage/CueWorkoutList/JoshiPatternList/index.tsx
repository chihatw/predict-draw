import * as R from 'ramda';
import { Checkbox, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../App';
import { CueWorkoutParams, JOSHI_PATTERN } from '../../../../Model';
import DefaultRow from './DefaultRow';
import InverseRow from './InverseRow';
import TopicWoHeadRow from './TopicWoHeadRow';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../../services/cueWorkout/createCueFromParams';
import TopicWoTailRow from './TopicWoTailRow';
import TopicNiHeadRow from './TopicNiHeadRow';
import TopicNiTailRow from './TopicNiTailRow';
import GroupWoHeadRow from './GroupWoHeadRow';
import GroupWoTailRow from './GroupWoTailRow';
import GroupNiHeadRow from './GroupNiHeadRow';
import GroupNiTailRow from './GroupNiTailRow';

const JoshiPatternList = () => {
  const { state } = useContext(AppContext);

  const handleClick = async (value: string) => {
    const hasValue = state.cueWorkout.params.joshiPatterns.includes(value);
    let updatedJoshiPatterns = [...state.cueWorkout.params.joshiPatterns];
    if (!hasValue) {
      updatedJoshiPatterns.push(value);
    } else {
      updatedJoshiPatterns = updatedJoshiPatterns.filter((i) => i !== value);
    }
    const updatedParams = R.assocPath<string[], CueWorkoutParams>(
      ['joshiPatterns'],
      updatedJoshiPatterns
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  return (
    <Table size='small'>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} rowSpan={2} />
          <TableCell>
            <DefaultRow
              value={JOSHI_PATTERN.default}
              handleClick={() => handleClick(JOSHI_PATTERN.default)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <InverseRow
              value={JOSHI_PATTERN.inverse}
              handleClick={() => handleClick(JOSHI_PATTERN.inverse)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={4}>主題</TableCell>
          <TableCell rowSpan={2}>ヲ格</TableCell>
          <TableCell>前置</TableCell>
          <TableCell>
            <TopicWoHeadRow
              value={JOSHI_PATTERN.topic_wo_head}
              handleClick={() => handleClick(JOSHI_PATTERN.topic_wo_head)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ color: '#aaa' }}>後置</TableCell>
          <TableCell>
            <TopicWoTailRow
              value={JOSHI_PATTERN.topic_wo_tail}
              handleClick={() => handleClick(JOSHI_PATTERN.topic_wo_tail)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2}>
            <div>ニ格</div>
          </TableCell>
          <TableCell>前置</TableCell>
          <TableCell>
            <TopicNiHeadRow
              value={JOSHI_PATTERN.topic_ni_head}
              handleClick={() => handleClick(JOSHI_PATTERN.topic_ni_head)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ color: '#aaa' }}>後置</TableCell>
          <TableCell>
            <TopicNiTailRow
              value={JOSHI_PATTERN.topic_ni_tail}
              handleClick={() => handleClick(JOSHI_PATTERN.topic_ni_tail)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={4}>分類</TableCell>
          <TableCell rowSpan={2}>ヲ格</TableCell>
          <TableCell>前置</TableCell>
          <TableCell>
            <GroupWoHeadRow
              value={JOSHI_PATTERN.group_wo_head}
              handleClick={() => handleClick(JOSHI_PATTERN.group_wo_head)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>後置</TableCell>
          <TableCell>
            <GroupWoTailRow
              value={JOSHI_PATTERN.group_wo_tail}
              handleClick={() => handleClick(JOSHI_PATTERN.group_wo_tail)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2}>
            <div>ニ格</div>
          </TableCell>
          <TableCell>前置</TableCell>
          <TableCell>
            <GroupNiHeadRow
              value={JOSHI_PATTERN.group_ni_head}
              handleClick={() => handleClick(JOSHI_PATTERN.group_ni_head)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>後置</TableCell>
          <TableCell>
            <GroupNiTailRow
              value={JOSHI_PATTERN.group_ni_tail}
              handleClick={() => handleClick(JOSHI_PATTERN.group_ni_tail)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default JoshiPatternList;
