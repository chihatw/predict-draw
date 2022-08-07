import { Button } from '@mui/material';

import React, { useContext, useRef, useState } from 'react';

import TimePane from './TimePane';
import TimerButton from './TimerButton';
import BPMCulcLabel from './BPMCulcLabel';
import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import AppContext from '../../services/context';

import { startRunning, setWorkoutTime } from '../../services/workoutParams';
import {
  INITIAL_WORKOUT,
  INITIAL_WORKOUT_TIME,
  WorkoutTime,
} from '../../Model';

export const BpmCulc = () => {
  const { state } = useContext(AppContext);
  const { workouts, workoutParams } = state;
  const { workoutId, bpm, isRunning } = workoutParams;

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { beatCount, label } = workout;

  const loopIdRef = useRef(0);
  const startAtRef = useRef(0);

  const [miliSeconds, setMiliSeconds] = useState(0);

  const start = () => {
    startRunning();
    startAtRef.current = performance.now();
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const loop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setMiliSeconds(elapsedTime);
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setMiliSeconds(elapsedTime);
    cancelAnimationFrame(loopIdRef.current);
    const bpm = calcBpm({ miliSeconds: elapsedTime, beatCount });
    const newWorkoutTime: WorkoutTime = {
      bpm,
      time: elapsedTime,
      isRunning: false,
    };
    setWorkoutTime(newWorkoutTime);
  };

  const handleClick = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  const handleReset = () => {
    setMiliSeconds(0);
    setWorkoutTime(INITIAL_WORKOUT_TIME);
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
