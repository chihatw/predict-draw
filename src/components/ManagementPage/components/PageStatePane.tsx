import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useContext } from 'react';
import AppContext, { PageState } from '../../../services/context';

const PAGE_STATE: { value: PageState; label: string }[] = [
  { value: 'readTimePractice', label: '時間表示練習' },
  { value: 'readTimePerformance', label: '時間表示本番' },
  { value: 'writeTimePerformance', label: '時間入力' },
  { value: 'greeting', label: '挨拶' },
  { value: 'bpmCalc', label: 'BPMCalc' },
  { value: 'bpmTrack', label: 'BPMTrack' },
  { value: 'predict', label: '質問' },
  { value: 'draw', label: '返答' },
  { value: 'talkingToLiSan', label: '李さんに' },
  { value: 'talkingToKouSan', label: '黄さんに' },
  { value: '', label: '空欄' },
];

const PageStatePane = ({
  user,
  state,
  setState,
}: {
  user: string;
  state: PageState;
  setState: (state: PageState) => void;
}) => {
  const { updatePredict, updateLiSanPageState, updateKouSanPageState } =
    useContext(AppContext);

  const handleChangeState = (state: PageState) => {
    setState(state);
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
