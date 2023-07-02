import { Clear } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { ICuePatternParams } from 'application/cuePatternParams/core/0-interface';
import { initialState } from 'application/cuePatternParams/core/1-constants';
import { Dispatch, createContext, useReducer } from 'react';
import { TARGET } from '../../../../Model';
import useCurrentPatterns from '../services/useCurrentPatterns';
import PatternListSwitchesPane from './PatternListSwitchesPane';

const reducer = (state: ICuePatternParams, action: ICuePatternParams) => action;

export const PatternListContext = createContext<{
  listState: ICuePatternParams;
  listDispatch: Dispatch<ICuePatternParams>;
}>({
  listState: initialState,
  listDispatch: () => {},
});

const PatternList = () => {
  const [listState, listDispatch] = useReducer(reducer, initialState);
  const currentPatterns = useCurrentPatterns(listState);

  return (
    <PatternListContext.Provider value={{ listState, listDispatch }}>
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
          <TableBody>
            {currentPatterns.map((pattern, index) => (
              <TableRow key={index}>
                <TableCell padding='none'>{index + 1}</TableCell>
                <TableCell>{pattern.sentence}</TableCell>
                <TableCell align='center'>
                  {pattern.topic === TARGET.none ? (
                    <Clear sx={{ fontSize: 12 }} />
                  ) : pattern.topic === TARGET.wo ? (
                    'ヲ格'
                  ) : (
                    'ニ格'
                  )}
                </TableCell>
                <TableCell align='center'>
                  {pattern.grouping === TARGET.none ? (
                    <Clear sx={{ fontSize: 12 }} />
                  ) : pattern.grouping === TARGET.wo ? (
                    'ヲ格'
                  ) : (
                    'ニ格'
                  )}
                </TableCell>
                <TableCell align='center'>
                  {pattern.isWoFirst ? '正' : '逆'}
                </TableCell>
                <TableCell align='center'>
                  {pattern.isNegative ? '否' : '肯'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PatternListContext.Provider>
  );
};

export default PatternList;
