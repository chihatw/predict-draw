import { css } from '@emotion/css';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, TextField } from '@mui/material';
import React, { useRef, useState, useMemo } from 'react';
import { useHandleTimes, useTimes } from '../../services/useTimes';

const WriteTimePerformance = () => {
  const { hours, minutes, score } = useTimes();
  const { updateInputTime, updateScore } = useHandleTimes();
  const [value, setValue] = useState<Date | null>(new Date(Date.now()));
  const [text, setText] = useState('');
  const time = useMemo(
    () => new Date(`2020/01/01 ${hours}:${minutes}:00`),
    [hours, minutes]
  );

  const labelRef = useRef<HTMLDivElement>(null);

  const handleAnswer = () => {
    if (!value) return;
    const answerHours = time.getHours();
    const answerMinutes = time.getMinutes();
    const inputHours = value.getHours();
    const inputMinutes = value?.getMinutes();
    if (answerHours === inputHours && answerMinutes === inputMinutes) {
      updateScore(score + 10);
      setText('正解です');
    } else {
      setText('違います');
    }
    const label = labelRef.current;
    if (!!label) {
      setTimeout(() => {
        label.classList.add('flag');
      }, 1500);
      setTimeout(() => {
        setText('');
        label.classList.remove('flag');
      }, 2000);
    }
  };

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (!!newValue) {
      updateInputTime(newValue.getTime());
    } else {
      updateInputTime(0);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        <div
          ref={labelRef}
          className={css({
            textAlign: 'center',
            fontSize: 96,
            fontWeight: 'bold',
            letterSpacing: -10,
            background:
              'repeating-linear-gradient( 90deg, #52a2aa 0, #90CAF9 100% )',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            transition: 'opacity .3s',
            opacity: 1,
            '&.flag': {
              opacity: 0,
            },
          })}
        >
          {text}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default WriteTimePerformance;
