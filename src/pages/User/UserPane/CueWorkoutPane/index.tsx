import { Container } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../../../services/context';

import TimeDisplay from '../commons/TimeDisplay';

import CardList from './CardList';
import CuePane from './CuePane';
import Points from './Points';
import {
  createCueFromParams,
  getCueString,
  setCueWorkoutCue,
  setCueWorkoutParams,
  stopCueWorkout,
} from '../../../../services/cueWorkout';
import { CueWorkoutParams } from '../../../../Model';
import PlayButton from './PlayButton';

const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
const VERBS = [
  'motsu',
  'yubisasu',
  'hikkurikaesu',
  'ireru',
  'noseru',
  'kabuseru',
];

const CueWorkoutPane = () => {
  const { state } = useContext(AppContext);
  const { cueWorkout } = state;
  const { params, cue } = cueWorkout;
  const { colors, verbs, isRunning, time, points } = params;
  const [miliSeconds, setMiliSeconds] = useState(0);

  const startAtRef = useRef(0);
  const loopIdRef = useRef(0);

  useEffect(() => {
    if (isRunning) return;
    const miliSeconds = time * 1000;
    setMiliSeconds(miliSeconds);
  }, [time, isRunning]);

  const start = async () => {
    startAtRef.current = performance.now();
    loop();
    const newParams: CueWorkoutParams = {
      ...params,
      isRunning: true,
    };
    await setCueWorkoutParams(newParams);
  };
  const loop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    const miliSeconds = time * 1000 - elapsedTime;
    if (miliSeconds > 0) {
      setMiliSeconds(miliSeconds);
      loopIdRef.current = window.requestAnimationFrame(loop);
      return;
    }
    stop();
  };

  const next = async () => {
    let updatedCue = cue;
    while (getCueString(updatedCue) === getCueString(cue)) {
      updatedCue = createCueFromParams(params);
    }
    await setCueWorkoutCue(updatedCue);
    const newParams: CueWorkoutParams = {
      ...params,
      points: points + 1,
    };
    await setCueWorkoutParams(newParams);
  };

  const stop = async () => {
    setMiliSeconds(0);
    window.cancelAnimationFrame(loopIdRef.current);
    await stopCueWorkout();
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 0 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <CardList list={COLORS} columns={6} selectedList={colors} />
        <CardList list={VERBS} columns={6} selectedList={verbs} />

        <div style={{ marginBottom: -20, marginTop: 20 }}>
          <Points />
        </div>
        <TimeDisplay miliSeconds={miliSeconds} />
        <div style={{ margin: '16px 0', height: 200 }}>
          {isRunning && <CuePane />}
        </div>
        <PlayButton start={start} next={next} />
      </div>
    </Container>
  );
};

export default CueWorkoutPane;
