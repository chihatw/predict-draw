import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';

import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Layout from '../Layout';
import { useHandleTimes, useTimes } from '../services/useTimes';
import { SettingsCellRounded } from '@mui/icons-material';

const SandBox = () => {
  const { time } = useTimes();
  const { score } = useTimes();
  const { setInputTime, setScore } = useHandleTimes();
  const [value, setValue] = useState<Date | null>(new Date(Date.now()));

  const handleAnswer = () => {
    if (!value) return;
    const answerHours = time.getHours();
    const answerMinutes = time.getMinutes();
    const inputHours = value.getHours();
    const inputMinutes = value?.getMinutes();
    console.log({ answerHours, answerMinutes, inputHours, inputMinutes });
    if (answerHours === inputHours && answerMinutes === inputMinutes) {
      console.log('Correct!!');
      setScore(score + 10);
    } else {
      console.log('Incorrect!!');
    }
  };

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (!!newValue) {
      setInputTime(newValue.getTime());
    } else {
      setInputTime(0);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Layout color='red'>
        <div style={{ display: 'grid', rowGap: 80 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 80,
            }}
          >
            <TimePicker
              label='Time'
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ width: 240 }} />
              )}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              sx={{ width: 240, height: 48 }}
              onClick={handleAnswer}
              disabled={!value}
            >
              <span style={{ color: '#fff', fontWeight: 'bold' }}>
                これで答える
              </span>
            </Button>
          </div>
        </div>
      </Layout>
    </LocalizationProvider>
  );
};

export default SandBox;
