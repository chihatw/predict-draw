import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useContext } from 'react';
import AppContext from '../../../services/context';

const PageStatePane = ({
  user,
  state,
  setState,
}: {
  user: string;
  state: string;
  setState: (state: string) => void;
}) => {
  const { updatePredict, updateLiSanPageState, updateKouSanPageState } =
    useContext(AppContext);

  const handleChangeState = (state: string) => {
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
    <FormControl color='secondary'>
      <FormLabel sx={{ fontSize: 12 }}>状態</FormLabel>
      <RadioGroup
        row
        value={state}
        onChange={(e) => handleChangeState(e.target.value)}
      >
        <FormControlLabel
          value='greeting'
          control={<Radio size='small' />}
          label='挨拶'
        />
        <FormControlLabel
          value='bpmCalc'
          control={<Radio size='small' />}
          label='BPMCalc'
        />
        <FormControlLabel
          value='predict'
          control={<Radio size='small' />}
          label='質問'
        />
        <FormControlLabel
          value='draw'
          control={<Radio size='small' />}
          label='返答'
        />
        <FormControlLabel
          value='talkingToLiSan'
          control={<Radio size='small' />}
          label='李さんに'
        />
        <FormControlLabel
          value='talkingToKouSan'
          control={<Radio size='small' />}
          label='黄さんに'
        />
        <FormControlLabel
          value=''
          control={<Radio size='small' />}
          label='空欄'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default PageStatePane;
