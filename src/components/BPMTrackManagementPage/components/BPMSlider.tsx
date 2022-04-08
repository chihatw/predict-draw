import { Slider } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import useBpmTrack from '../../../services/useBpmTrack';

const DELAY = 15; // ms

const BPMSlider = () => {
  const { bpm: superBpm, updateBpm } = useBpmTrack();
  const [bpm, setBpm] = useState(0);

  const timerId = useRef(0);

  useEffect(() => {
    setBpm(superBpm);
  }, [superBpm]);

  const handleChangeBpm = (value: number) => {
    setBpm(value);

    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      updateBpm(value);
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
      <div>{`BPM: ${bpm}`}</div>
      <div style={{ padding: '0 16px', flexGrow: 1 }}>
        <Slider
          min={60}
          max={300}
          step={10}
          value={bpm}
          onChange={(e, value: number | number[]) => {
            typeof value === 'number' && handleChangeBpm(value);
          }}
        />
      </div>
    </div>
  );
};

export default BPMSlider;
