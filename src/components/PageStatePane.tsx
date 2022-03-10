import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

const PageStatePane = ({
  state,
  handleChangeState,
}: {
  state: string;
  handleChangeState: (state: string) => void;
}) => (
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

export default PageStatePane;
