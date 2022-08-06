import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useContext, useMemo } from 'react';
import { pages } from '../../../../Model';
import AppContext from '../../../../services/context';

import usePageState, { setPageState } from '../../../../services/pageState';
import { ActionTypes } from '../../../../Update';

const PAGE_STATE: { value: string; label: string }[] = [
  { value: pages.bpmCalc, label: 'BPM計測' },
  { value: pages.workoutCue, label: 'キュー出し' },
  { value: pages.workoutRead, label: 'キュー受け' },
  { value: pages.blank, label: '空欄' },
];

const PageStatePane = ({ user }: { user: string }) => {
  const { dispatch, state } = useContext(AppContext);
  const { liSanPageState, kouSanPageState } = state;

  const _state = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [liSanPageState, kouSanPageState, user]);

  const handleChangeState = (state: string) => {
    if (!dispatch) return;
    switch (user) {
      case 'liSan':
        dispatch({ type: ActionTypes.changeLiSanPageState, payload: state });
        setPageState({ id: 'liSan', state });
        break;
      case 'kouSan':
        // local
        dispatch({ type: ActionTypes.changeKouSanPageState, payload: state });
        setPageState({ id: 'kouSan', state });
        break;
      default:
    }
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 12 }}>状態</FormLabel>
      <RadioGroup
        row
        value={_state}
        onChange={(e) => handleChangeState(e.target.value)}
      >
        {PAGE_STATE.map(({ value, label }, index) => (
          <FormControlLabel
            key={index}
            value={value}
            control={<Radio size='small' />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default PageStatePane;
