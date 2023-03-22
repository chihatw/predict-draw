import { Button, useTheme } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { AppContext } from '../../../../App';
import { SpeedWorkoutParams } from '../../../../Model';
import { setSpeedWorkoutParams } from '../../../../services/speedWorkout';
import BPMCulcLabel from '../commons/BPMCulcLabel';
import { SpeedWorkoutState } from './Model';
import TimePane from './TimePane';
import TimerButton from './TimerButton';
import { SpeedWorkoutAction, SpeedWorkoutActionTypes } from './Update';

const SpeedWorkoutForm = ({
  state,
  dispatch,
}: {
  state: SpeedWorkoutState;
  dispatch: React.Dispatch<SpeedWorkoutAction>;
}) => {
  const { state: appState } = useContext(AppContext);
  const loopIdRef = useRef(0);
  const startAtRef = useRef(0);

  const start = () => {
    const updatedState: SpeedWorkoutState = {
      ...state,
      isRunning: true,
    };
    dispatch({ type: SpeedWorkoutActionTypes.setState, payload: updatedState });
    startAtRef.current = performance.now();
    loopIdRef.current = requestAnimationFrame(loop);

    const params: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
      bpm: 0,
      isRunning: true,
    };
    setSpeedWorkoutParams(params);
  };
  const loop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    dispatch({
      type: SpeedWorkoutActionTypes.setMiliSeconds,
      payload: elapsedTime,
    });
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    const updatedState: SpeedWorkoutState = {
      ...state,
      isRunning: false,
      miliSeconds: elapsedTime,
    };
    dispatch({ type: SpeedWorkoutActionTypes.setState, payload: updatedState });
    cancelAnimationFrame(loopIdRef.current);

    const bpm = calcBpm({
      miliSeconds: elapsedTime,
      beatCount: state.workout.beatCount,
    });

    const params: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
      bpm,
      isRunning: false,
    };
    setSpeedWorkoutParams(params);
  };

  const handleClick = () => {
    if (state.isRunning) {
      stop();
    } else {
      start();
    }
  };

  const handleReset = () => {
    const updatedState: SpeedWorkoutState = {
      ...state,
      miliSeconds: 0,
      isRunning: false,
    };
    dispatch({ type: SpeedWorkoutActionTypes.setState, payload: updatedState });
    const params: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
      bpm: 0,
      isRunning: false,
    };
    setSpeedWorkoutParams(params);
  };

  let bpm = 0;
  if (!state.isRunning && !!state.miliSeconds && !!state.workout.beatCount) {
    bpm = calcBpm({
      miliSeconds: state.miliSeconds,
      beatCount: state.workout.beatCount,
    });
  }
  return (
    <div>
      <BPMCulcLabel
        label={state.workout.label}
        beatCount={state.workout.beatCount}
      />
      <div style={{ height: 40 }} />
      <BpmPane bpm={bpm} />
      <TimePane miliSeconds={state.miliSeconds} />
      <div style={{ height: 40 }} />
      <TimerButton isRunning={state.isRunning} handleClick={handleClick} />
      <div style={{ height: 40 }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='outlined' sx={{ width: 260 }} onClick={handleReset}>
          RESET
        </Button>
      </div>
    </div>
  );
};

export default SpeedWorkoutForm;

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

type BpmPaneProps = {
  bpm: number;
  fontSize?: number;
};

function BpmPane({ bpm, fontSize }: BpmPaneProps) {
  const theme = useTheme();
  return (
    <div
      style={{
        ...(theme.typography as any).lato900,
        fontSize: fontSize ?? 60,
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          ...(theme.typography as any).lato100,
          fontSize: 36,
          paddingRight: 20,
          paddingBottom: 6,
        }}
      >
        BPM
      </div>
      <div>{bpm > 0 ? bpm : '--'}</div>
    </div>
  );
}
