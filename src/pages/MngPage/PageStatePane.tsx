import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { PAGE_STATE } from '../../Model';

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
