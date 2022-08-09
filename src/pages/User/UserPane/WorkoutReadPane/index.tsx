import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';

import React, { useContext, useRef, useState } from 'react';
import { INITIAL_WORKOUT } from '../../../../Model';

import AppContext from '../../../../services/context';
import {
  resetWorkoutParams,
  setWorkoutTime,
  startRunning,
} from '../../../../services/workoutParams';

import WorkoutLabel from '../commons/WorkoutLabel';
import WorkoutStatus from '../commons/WorkoutStatus';
import StartReset from './components/StartReset';
import StopButton from './components/StopButton';
import TimeDisplay from './components/TimeDisplay';

const WorkoutReadPane = () => {
  const { state } = useContext(AppContext);
  const { workouts, workoutParams } = state;
  const { workoutId, bpm, totalRounds, checkedIndexes, isRunning } =
    workoutParams;
  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;
  const { beatCount, label } = workout;

  const [time, setTime] = useState(0);

  const startAtRef = useRef(0);
  const rafIdRef = useRef(0);
  const start = () => {
    startAtRef.current = performance.now();
    loop();
    startRunning();
  };
  const loop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    setTime(elapsedTime);
    rafIdRef.current = window.requestAnimationFrame(loop);
  };
  const stop = () => {
    window.cancelAnimationFrame(rafIdRef.current);
    const elapsedTime = performance.now() - startAtRef.current;
    const bpm = Math.floor(beatCount / (elapsedTime / 1000 / 60));
    setTime(elapsedTime);
    setWorkoutTime({ time: elapsedTime, bpm, isRunning: false });
  };
  const handleClickStop = () => {
    stop();
  };
  const handleClickStart = () => {
    start();
  };
  const handleClickReset = () => {
    setTime(0);
    resetWorkoutParams(totalRounds);
  };
  return (
    <div style={{ display: 'grid', rowGap: 32 }}>
      <WorkoutLabel label={label} beatCount={beatCount} />
      {!isRunning && checkedIndexes.length ? (
        <BpmPane bpm={bpm} fontSize={88} />
      ) : (
        <>
          <TimeDisplay time={time} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WorkoutStatus />
          </div>
        </>
      )}
      <div style={{ height: 32 }} />

      {!!isRunning && <StopButton handleClickStop={handleClickStop} />}

      {!isRunning && (
        <StartReset
          handleClickReset={handleClickReset}
          handleClickStart={handleClickStart}
        />
      )}
    </div>
  );
};

export default WorkoutReadPane;
