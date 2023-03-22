import * as R from 'ramda';
import { Container } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../App';
import TimeDisplay from '../commons/TimeDisplay';
import CuePane from './CuePane';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
  stopCueWorkout,
} from '../../../../services/cueWorkout/cueWorkout';
import { CueWorkoutParams, State } from '../../../../Model';
import PlayButton from './PlayButton';
import { ActionTypes } from '../../../../Update';
import ColorList from './CardList/ColorList';
import getImages from './CuePane/getImages';
import createCueFromParams from '../../../../services/cueWorkout/createCueFromParams';

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
    while (updatedCue.text === state.cueWorkout.cue.text) {
      updatedCue = createCueFromParams(
        state.cueWorkout.params.colors,
        state.cueWorkout.params.patternParams
      );
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
