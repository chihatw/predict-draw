import { Container } from '@mui/material';
import { cueWorkoutParamsActions } from 'application/cueWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../..';
import { Pattern } from '../../../Model';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';
import { setCueWorkoutCue } from '../../../services/cueWorkout/cueWorkout';
import TimeDisplay from '../TimeDisplay';
import ColorList from './CardList/ColorList';
import CuePane from './CuePane';
import PlayButton from './PlayButton';

const UserCueWorkoutPane = () => {
  const dispatch = useDispatch();
  const { state } = useContext(AppContext);
  const { isRunning, time, colors } = useSelector(
    (state: RootState) => state.cueWorkoutParams
  );
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams
  );
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
    timerLoop();
    dispatch(cueWorkoutParamsActions.start());
  };

  const timerLoop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    const miliSeconds = time * 1000 - elapsedTime;
    if (miliSeconds > 0) {
      setMiliSeconds(miliSeconds);
      loopIdRef.current = window.requestAnimationFrame(timerLoop);
      return;
    }
    stopTimer();
  };

  const next = async () => {
    /** 新しい Cue の作成 */
    let updatedCue = state.cueWorkout.cue;
    while (isContinue(state.cueWorkout.cue.pattern, updatedCue.pattern)) {
      const cue = createCueFromParams(colors, cuePatternParams);
      updatedCue = cue;
    }
    await setCueWorkoutCue(updatedCue);

    dispatch(cueWorkoutParamsActions.next());
  };

  const stopTimer = async () => {
    setMiliSeconds(0);
    window.cancelAnimationFrame(loopIdRef.current);
    dispatch(cueWorkoutParamsActions.stop());
  };

  const handleClick = () => {
    isRunning ? next() : start();
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 0 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <ColorList />
        <TimeDisplay miliSeconds={miliSeconds} />
        <div style={{ margin: '16px 0', height: 300 }}>
          {isRunning && <CuePane cueWorkout={state.cueWorkout} />}
        </div>
        <PlayButton handleClick={handleClick} />
      </div>
    </Container>
  );
};

export default UserCueWorkoutPane;

const isContinue = (currentPattern: Pattern, updatedPattern: Pattern) => {
  return isSamePattern(currentPattern, updatedPattern);
};

const isSamePattern = (currentPattern: Pattern, updatedPattern: Pattern) => {
  return JSON.stringify(updatedPattern) === JSON.stringify(currentPattern);
};
