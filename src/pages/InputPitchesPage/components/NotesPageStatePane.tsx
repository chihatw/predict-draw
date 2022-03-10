import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

const NotesPageStatePane = ({
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
        control={<Radio size='small' color='secondary' />}
        label='挨拶'
      />
      <FormControlLabel
        value='pitches'
        control={<Radio size='small' color='secondary' />}
        label='ピッチ'
      />
    </RadioGroup>
  </FormControl>
);

export default NotesPageStatePane;
