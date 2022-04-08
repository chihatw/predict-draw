import { Slider } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../../services/context';
import useBpmTrack from '../../../services/useBpmTrack';

const DELAY = 15; // ms

const SyncopationRatioSlider = () => {
  const { syncopationRatio, updateSyncopationRatio } = useBpmTrack();
  const [value, setValue] = useState(syncopationRatio);

  const timerId = useRef(0);

  useEffect(() => {
    setValue(syncopationRatio);
  }, [syncopationRatio]);

  const handleChangeValue = (value: number) => {
    setValue(value);

    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      updateSyncopationRatio(value);
    }, DELAY);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>{`Ratio: ${syncopationRatio}`}</div>
      <div style={{ padding: '0 16px', flexGrow: 1 }}>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={(e, value: number | number[]) => {
            typeof value === 'number' && handleChangeValue(value);
          }}
        />
      </div>
    </div>
  );
};

export default SyncopationRatioSlider;
