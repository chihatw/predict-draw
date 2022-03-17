import { Slider } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';

import AppContext from '../../../services/context';

const DELAY = 15; // ms

const BPMSlider = () => {
  const { bpmTrackBpm, updateBpmTrackBpm } = useContext(AppContext);
  const [bpm, setBpm] = useState(bpmTrackBpm);

  const timerId = useRef(0);

  useEffect(() => {
    setBpm(bpmTrackBpm);
  }, [bpmTrackBpm]);

  const handleChangeBpm = (value: number) => {
    setBpm(value);

    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      updateBpmTrackBpm(value);
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
