import { Button } from '@mui/material';

import React, { useRef, useState } from 'react';

import TimePane from './components/TimePane';
import TimerButton from './components/TimerButton';
import BPMCulcLabel from './components/BPMCulcLabel';
import { useBpmCalc, useHandleBpmCalc } from '../../services/useBpmCalc';
import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';

export const BpmCulc = () => {
  const { label, beatCount } = useBpmCalc();
  const { startTimer, stopTimer } = useHandleBpmCalc();

  const loopIdRef = useRef(0);
  const startAtRef = useRef(0);

  const [bpm, setBpm] = useState(-1); // -1 で '--' を表示
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
    startTimer();
    startAtRef.current = performance.now();
    loopIdRef.current = requestAnimationFrame(loop);
    setBpm(-1);
  };
  const loop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setMiliSeconds(elapsedTime);
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    setIsRunning(false);
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setMiliSeconds(elapsedTime);
    cancelAnimationFrame(loopIdRef.current);
    const bpm = calcBpm({ miliSeconds: elapsedTime, beatCount });
    setBpm(bpm);
    stopTimer(bpm);
  };

  const handleReset = () => {
    setMiliSeconds(0);
    setBpm(-1);
  };

  return (
    <div>
      <BPMCulcLabel label={label} beatCount={beatCount} />
      <div style={{ height: 40 }} />
      <BpmPane bpm={bpm} />
      <TimePane miliSeconds={miliSeconds} />
      <div style={{ height: 40 }} />
      <TimerButton isRunning={isRunning} handleClick={handleClick} />
      <div style={{ height: 40 }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='outlined' sx={{ width: 260 }} onClick={handleReset}>
          RESET
        </Button>
      </div>
    </div>
  );
};

const calcBpm = ({
  beatCount,
  miliSeconds,
}: {
  beatCount: number;
  miliSeconds: number;
}) => {
  const seconds = miliSeconds / 1000;
  return Math.floor((beatCount / seconds) * 60);
};
