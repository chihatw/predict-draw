import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import {
  StopCircleRounded,
  PlayCircleRounded,
  ClearRounded,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { useMemo, useRef, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import {
  useHandleWorkoutItems,
  useWorkoutItems,
} from '../../../services/useWorkoutItems';
import WorkoutStatus from '../components/WorkoutStatus';

const WorkoutItemsPlayerPane = () => {
  const { workoutItems, workoutTime, workoutRound, checkedIndexes } =
    useWorkoutItems();
  const { setWorkoutTime, setCheckedIndexes, setWorkoutRound } =
    useHandleWorkoutItems();
  const [isRunning, setIsRunning] = useState(false);
  const [bpm, setBpm] = useState(0);
  const [time, setTime] = useState(0);

  const beatCount = useMemo(() => {
    const pitchesArrayLines = workoutItems.map((workoutItem) =>
      string2PitchesArray(workoutItem.pitchesArray)
    );
    return (
      Math.ceil(pitchesArrayLines.flat(2).length / 2) * workoutRound.totalRounds
    );
  }, [workoutItems, workoutRound]);

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
      {isRunning &&
        workoutRound.currentRound === workoutRound.totalRounds &&
        workoutItems.length === checkedIndexes.length && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StopButton handleClickStop={handleClickStop} />
          </div>
        )}
      {!isRunning && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {checkedIndexes.length ? (
            <ResetButton handleClickReset={handleClickReset} />
          ) : (
            <StartButton handleClickStart={handleClickStart} />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutItemsPlayerPane;

const TimeDisplay = ({ time }: { time: number }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        ...(theme.typography as any).lato900,
        display: 'flex',
        justifyContent: 'center',
        fontSize: 98,
        fontWeight: 'bolder',
        color: '#555',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '150px 12px 150px' }}>
        <div style={{ textAlign: 'right' }}>{Math.floor(time / 1000)}</div>
        <div
          style={{
            fontSize: 60,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'flex-end',
            marginBottom: 8,
          }}
        >
          .
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            alignItems: 'flex-end',
            marginBottom: 8,
          }}
        >
          {Math.floor((time % 1000) / 100)}
        </div>
      </div>
    </div>
  );
};

const StopButton = ({ handleClickStop }: { handleClickStop: () => void }) => (
  <IconButton onClick={handleClickStop}>
    <StopCircleRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
  </IconButton>
);

const StartButton = ({
  handleClickStart,
}: {
  handleClickStart: () => void;
}) => (
  <IconButton onClick={handleClickStart}>
    <PlayCircleRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
  </IconButton>
);

const ResetButton = ({
  handleClickReset,
}: {
  handleClickReset: () => void;
}) => (
  <IconButton onClick={handleClickReset}>
    <ClearRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
  </IconButton>
);
