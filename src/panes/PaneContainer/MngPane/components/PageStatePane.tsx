import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useMemo } from 'react';
import { PageState } from '../../../../services/context';
import usePageState from '../../../../services/usePageState';
import usePredict from '../../../../services/usePredict';

const PAGE_STATE: { value: PageState; label: string }[] = [
  { value: 'greeting', label: '挨拶' },
  { value: 'bpmCalc', label: 'BPM計測' },
  { value: 'bpmTrack', label: 'BPMTrack' },
  { value: 'talkingToLiSan', label: '李さんに' },
  { value: 'talkingToKouSan', label: '黄さんに' },
  { value: 'workoutCue', label: 'キュー出し' },
  { value: 'workoutRead', label: 'キュー受け' },
  { value: '', label: '空欄' },
];

const PageStatePane = ({ user }: { user: string }) => {
  const {
    liSanPageState,
    kouSanPageState,
    updateLiSanPageState,
    updateKouSanPageState,
  } = usePageState();

  const state = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [liSanPageState, kouSanPageState, user]);

  const { updatePredict } = usePredict();

  const handleChangeState = (state: PageState) => {
    updatePredict('');
    switch (user) {
      case 'liSan':
        updateLiSanPageState(state);
        break;
      case 'kouSan':
        updateKouSanPageState(state);
        break;
      default:
    }
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 12 }}>状態</FormLabel>
      <RadioGroup
        row
        value={state}
        onChange={(e) => handleChangeState(e.target.value as PageState)}
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
