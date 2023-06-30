import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  PAGE_STATE,
  USER_LABELS,
} from 'application/pageStates/core/1-constants';
import { pageStatesActins } from 'application/pageStates/framework/0-reducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const PageStatePane = ({
  user,
  value,
}: {
  user: string;
  value: string | undefined;
}) => {
  const dispatch = useDispatch();
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

  const handleChange = (value: string) => {
    dispatch(pageStatesActins.changePageState({ id: user, state: value }));
  };

  return (
    <FormControl>
      <Button
        fullWidth
        sx={{ padding: '8px', justifyContent: 'flex-start' }}
        onClick={handleClick}
      >
        <FormLabel sx={{ fontSize: 12 }}>{USER_LABELS[user] || '??'}</FormLabel>
      </Button>
      {open && (
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
      )}
    </FormControl>
  );
};

export default PageStatePane;
