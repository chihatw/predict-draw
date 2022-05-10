import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import React, { useContext, useRef, useState } from 'react';

import AppContext from '../../../services/context';
import { useHandleWorkoutItems } from '../../../services/useWorkoutItems';
import { INITIAL_WORKOUT } from '../../../services/useWorkouts';
import WorkoutStatus from '../components/WorkoutStatus';
import StartReset from './components/StartReset';
import StopButton from './components/StopButton';
import TimeDisplay from './components/TimeDisplay';

const WorkoutReadPane = () => {
  const { workoutTime, workoutRound, checkedIndexes, workouts, workoutId } =
    useContext(AppContext);
  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;
  const { beatCount, label } = workout;

  const { setWorkoutTime, setCheckedIndexes, setWorkoutRound } =
    useHandleWorkoutItems();
  const [isRunning, setIsRunning] = useState(false);
  const [bpm, setBpm] = useState(0);
  const [time, setTime] = useState(0);

  const startAtRef = useRef(0);
  const rafIdRef = useRef(0);
  const start = () => {
    startAtRef.current = performance.now();
    loop();
  };
  const loop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    setTime(elapsedTime);
    rafIdRef.current = window.requestAnimationFrame(loop);
  };
  const stop = () => {
    window.cancelAnimationFrame(rafIdRef.current);

    const elapsedTime = performance.now() - startAtRef.current;
    setTime(elapsedTime);
    const bpm = Math.floor(beatCount / (elapsedTime / 1000 / 60));
    setBpm(bpm);
    setWorkoutTime({ time: elapsedTime, bpm, isRunning: false });
  };
  const handleClickStop = () => {
    stop();
    setIsRunning(false);
  };
  const handleClickStart = () => {
    start();
    setIsRunning(true);
    setWorkoutTime({ ...workoutTime, isRunning: true });
  };
  const handleClickReset = () => {
    setTime(0);
    setCheckedIndexes([]);

    const { totalRounds } = workoutRound;
    setWorkoutRound({ currentRound: 1, totalRounds });
  };
  return (
    <div style={{ display: 'grid', rowGap: 32, marginTop: 32 }}>
      <div
        style={{
          color: '#aaa',
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        {`${label}（${beatCount}拍）`}
      </div>
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
