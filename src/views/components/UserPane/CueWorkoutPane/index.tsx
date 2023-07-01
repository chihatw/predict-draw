import { Container } from '@mui/material';
import * as R from 'ramda';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../..';
import { CueWorkoutParams, Pattern, State, TARGET } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import createCueFromParams from '../../../../services/cueWorkout/createCueFromParams';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
  stopCueWorkout,
} from '../../../../services/cueWorkout/cueWorkout';
import TimeDisplay from '../../TimeDisplay';
import ColorList from './CardList/ColorList';
import CuePane from './CuePane';
import getImages from './CuePane/getImages';
import PlayButton from './PlayButton';

const CueWorkoutPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [miliSeconds, setMiliSeconds] = useState(0);
  const [initializing, setInitializing] = useState(true);

  /** 画像の読み込み */
  useEffect(() => {
    if (!initializing) return;
    const fetchData = async () => {
      const blobURLs = await getImages(state.blobURLs);
      const updatedBlobURLs = { ...state.blobURLs, ...blobURLs };
      const updatedState = R.assocPath<{ [imagePath: string]: string }, State>(
        ['blobURLs'],
        updatedBlobURLs
      )(state);

      dispatch({ type: ActionTypes.setState, payload: updatedState });
      setInitializing(false);
    };

    fetchData();
  }, [initializing]);

  const startAtRef = useRef(0);
  const loopIdRef = useRef(0);

  useEffect(() => {
    if (state.cueWorkout.params.isRunning) return;
    const miliSeconds = state.cueWorkout.params.time * 1000;

    setMiliSeconds(miliSeconds);
  }, [state.cueWorkout.params.time, state.cueWorkout.params.isRunning]);

  const startTimer = async () => {
    startAtRef.current = performance.now();
    timerLoop();

    /** 開始フラグ */
    const newParams: CueWorkoutParams = {
      ...state.cueWorkout.params,
      isRunning: true,
    };
    await setCueWorkoutParams(newParams);
  };

  const timerLoop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    const miliSeconds = state.cueWorkout.params.time * 1000 - elapsedTime;
    if (miliSeconds > 0) {
      setMiliSeconds(miliSeconds);
      loopIdRef.current = window.requestAnimationFrame(timerLoop);
      return;
    }
    stopTimer();
  };

  const showNextCue = async () => {
    /** 新しい Cue の作成 */
    let updatedCue = state.cueWorkout.cue;
    while (isContinue(state.cueWorkout.cue.pattern, updatedCue.pattern)) {
      const cue = createCueFromParams(
        state.cueWorkout.params.colors,
        state.cueWorkout.params.patternParams
      );
      updatedCue = cue;
    }
    await setCueWorkoutCue(updatedCue);

    /** ポイント加算 */
    const newParams: CueWorkoutParams = {
      ...state.cueWorkout.params,
      points: state.cueWorkout.params.points + 1,
    };
    await setCueWorkoutParams(newParams);
  };

  const stopTimer = async () => {
    setMiliSeconds(0);
    window.cancelAnimationFrame(loopIdRef.current);
    await stopCueWorkout();
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 0 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <ColorList />
        <TimeDisplay miliSeconds={miliSeconds} />
        <div style={{ margin: '16px 0', height: 300 }}>
          {state.cueWorkout.params.isRunning && (
            <CuePane cueWorkout={state.cueWorkout} />
          )}
        </div>
        <PlayButton startTimer={startTimer} showNextCue={showNextCue} />
      </div>
    </Container>
  );
};

export default CueWorkoutPane;

const isContinue = (currentPattern: Pattern, updatedPattern: Pattern) => {
  return isSamePattern(currentPattern, updatedPattern);
  // isStraightTopicless(currentPattern, updatedPattern)
};

const isSamePattern = (currentPattern: Pattern, updatedPattern: Pattern) => {
  return JSON.stringify(updatedPattern) === JSON.stringify(currentPattern);
};

// 主題なしは連続させない
const isStraightTopicless = (
  currentPattern: Pattern,
  updatedPattern: Pattern
) => {
  // 現在主題がなければ、
  return (
    currentPattern.topic === TARGET.none && updatedPattern.topic === TARGET.none
  );
};
