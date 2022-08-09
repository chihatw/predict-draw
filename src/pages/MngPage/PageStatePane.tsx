import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { pages } from '../../Model';

const PAGE_STATE: { value: string; label: string }[] = [
  { value: pages.bpmCalc, label: 'BPM計測' },
  { value: pages.workoutCue, label: 'キュー出し' },
  { value: pages.workoutRead, label: 'キュー受け' },
  { value: pages.randomWorkout, label: 'ランダム' },
  { value: pages.blank, label: '空欄' },
];

const PageStatePane = ({
  label,
  value,
  handleChange,
}: {
  label: string;
  value: string;
  handleChange: (value: string) => void;
}) => {
  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 12 }}>{label}</FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={(e) => handleChange(e.target.value)}
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
