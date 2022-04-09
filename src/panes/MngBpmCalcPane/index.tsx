import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useBpmCalc, useHandleBpmCalc } from '../../services/useBpmCalc';

const MngBpmCalc = () => {
  const {
    bpm,
    label: superLabel,
    isRunning,
    beatCount: superBeatCount,
  } = useBpmCalc();
  const { updateLabel, updateBeatCount } = useHandleBpmCalc();

  const [label, setLabel] = useState('');
  const [beatCount, setBeatCount] = useState(0);

  useEffect(() => {
    setLabel(superLabel);
  }, [superLabel]);

  useEffect(() => {
    setBeatCount(superBeatCount);
  }, [superBeatCount]);

  const handleChangeLabel = (value: string) => {
    setLabel(value);
    updateLabel(value);
  };

  const handleChangeBeatCount = (value: number) => {
    setBeatCount(value);
    updateBeatCount(value);
  };

  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <TextField
        size='small'
        value={label}
        label='label'
        onChange={(e) => handleChangeLabel(e.target.value)}
      />
      <TextField
        size='small'
        type='number'
        label='beatCount'
        value={beatCount}
        onChange={(e) => handleChangeBeatCount(Number(e.target.value))}
      />
      <div>{isRunning ? '計測中' : '待機中'}</div>
      <div>{`BPM: ${bpm}`}</div>
    </div>
  );
};

export default MngBpmCalc;
