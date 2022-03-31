import { Button } from '@mui/material';
import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import React, { useMemo, useRef, useState } from 'react';

import TimePane from './components/TimePane';
import { Timer } from './classes/Timer';
import TimerButton from './components/TimerButton';
import BPMCulcLabel from './components/BPMCulcLabel';

export type BpmCulcProps = {
  label: string;
  syllableCount: number;
  superSetTime?: (value: number) => void;
  superhandleStop?: (value: number) => void;
  superhandleStart?: () => void;
};

export function BpmCulc({
  label,
  syllableCount,
  superhandleStop,
  superhandleStart,
}: BpmCulcProps) {
  const timer = useMemo(() => new Timer(), []);
  const loopIdRef = useRef(0);

  const [bpm, setBpm] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [miliSeconds, setMiliSeconds] = useState(0);

  const handleClick = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  const start = () => {
    setIsRunning(true);
    !!superhandleStart && superhandleStart();
    timer.startAt = performance.now();
    loopIdRef.current = requestAnimationFrame(loop);
    setBpm(-1);
  };
  const loop = () => {
    const elapsedTime = Math.floor(timer.getElaspedTime(performance.now()));
    setMiliSeconds(elapsedTime);
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    setIsRunning(false);
    const elapsedTime = Math.floor(timer.getElaspedTime(performance.now()));
    setMiliSeconds(elapsedTime);
    !!superhandleStop && superhandleStop(elapsedTime);
    cancelAnimationFrame(loopIdRef.current);
    setBpm(calcBpm({ miliSeconds: elapsedTime, syllableCount }));
  };

  const handleReset = () => {
    setMiliSeconds(0);
    setBpm(-1);
  };

  return (
    <div>
      <BPMCulcLabel label={label} syllableCount={syllableCount} />
      <div style={{ height: 40 }} />
      <BpmPane bpm={bpm} />
      <TimePane miliSeconds={miliSeconds} />
      <div style={{ height: 40 }} />
      <TimerButton isRunning={isRunning} handleClick={handleClick} />
      <div style={{ height: 40 }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" sx={{ width: 260 }} onClick={handleReset}>
          RESET
        </Button>
      </div>
    </div>
  );
}

const calcBpm = ({
  miliSeconds,
  syllableCount,
}: {
  miliSeconds: number;
  syllableCount: number;
}) => {
  const seconds = miliSeconds / 1000;
  return Math.floor((syllableCount / seconds) * 60);
};
