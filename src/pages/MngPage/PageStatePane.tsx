import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { pages } from '../../Model';

const PAGE_STATE: { value: string; label: string }[] = [
  { value: pages.speedWorkoutSolo, label: '速読ソロ' },
  { value: pages.speedWorkoutCue, label: '速読キュー' },
  { value: pages.speedWorkoutRead, label: '速読練習' },
  { value: pages.cueWorkout, label: '紙コップ' },
  // { value: pages.workingMemory, label: 'ワーキングメモリ' },
  // { value: pages.note, label: 'ノート' },
  // { value: pages.rhythmList, label: 'リズム表示' },
  // { value: pages.rhythmWorkout, label: 'リズム練習' },
  // { value: pages.kanaCards, label: 'かな表示' },
  // { value: pages.kanaWorkout, label: 'かな練習' },
  { value: pages.blank, label: '空欄' },
  // { value: pages.randomWorkout, label: 'ランダム（実演用）' },
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
  const [open, setOpen] = useState(false);
  return (
    <FormControl>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormLabel sx={{ fontSize: 12 }}>{LABELS[user] || '??'}</FormLabel>
        <Button size='small' onClick={() => setOpen(!open)}>
          {open ? 'hide' : 'open'}
        </Button>
      </div>
      {open && (
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
      )}
    </FormControl>
  );
};

export default PageStatePane;
