import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PAGE_STATE } from '../../../Model';

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

  useEffect(() => {
    const value = localStorage.getItem(user);
    setOpen(value === String(true));
  }, [user]);

  const handleClick = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(user, String(updatedOpen));
  };
  return (
    <FormControl>
      <Button
        fullWidth
        sx={{ padding: '8px', justifyContent: 'flex-start' }}
        onClick={handleClick}
      >
        <FormLabel sx={{ fontSize: 12 }}>{LABELS[user] || '??'}</FormLabel>
      </Button>
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
