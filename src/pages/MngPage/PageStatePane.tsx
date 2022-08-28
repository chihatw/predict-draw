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
  { value: pages.cueWorkout, label: '助詞の練習' },
  { value: pages.workingMemory, label: '音韻記憶' },
  { value: pages.note, label: 'ノート' },
  { value: pages.rhythmList, label: 'リズムリスト' },
  { value: pages.rhythmListening, label: 'リズム聞き取り' },
  { value: pages.blank, label: '空欄' },
];
const LABELS: { [key: string]: string } = {
  liSan: '李さん',
  kouSan: '黄さん',
  chinSan: '陳さん',
};

const PageStatePane = ({
  user,
  value,
  handleChange,
}: {
  user: string;
  value: string;
  handleChange: (user: string, state: string) => void;
}) => {
  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 12 }}>{LABELS[user] || '??'}</FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={(e) => handleChange(user, e.target.value)}
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
