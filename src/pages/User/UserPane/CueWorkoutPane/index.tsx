import { Container } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../App';

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
import { CueWorkoutParams, State } from '../../../../Model';
import PlayButton from './PlayButton';
import { CUE_CARDS } from './CUE_CARDS';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../../repositories/firebase';
import { ActionTypes } from '../../../../Update';

const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
const VERBS = [
  'motsu',
  'ireru',
  'noseru',
  'yubisasu',
  'kabuseru',
  'hikkurikaesu',
];

const CueWorkoutPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [miliSeconds, setMiliSeconds] = useState(0);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;
    const fetchData = async () => {
      const _blobURLs: { [imagePath: string]: string } = {};
      await Promise.all(
        Object.values(CUE_CARDS).map(async (cueCard) => {
          if (!!cueCard.imagePath) {
            let _blobURL = '';

            if (state.blobURLs[cueCard.imagePath]) {
              _blobURL = state.blobURLs[cueCard.imagePath];
            } else {
              console.log('get imageBlob');
              const downloadURL = await getDownloadURL(
                ref(storage, cueCard.imagePath)
              );
              const response = await fetch(downloadURL);
              const blob = await response.blob();
              _blobURL = window.URL.createObjectURL(blob);
            }
            _blobURLs[cueCard.imagePath] = _blobURL;
          }
        })
      );
      const updatedBlobURLs = { ...state.blobURLs, ..._blobURLs };
      const updatedState: State = { ...state, blobURLs: updatedBlobURLs };
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

  const start = async () => {
    startAtRef.current = performance.now();
    loop();
    const newParams: CueWorkoutParams = {
      ...state.cueWorkout.params,
      isRunning: true,
    };
    await setCueWorkoutParams(newParams);
  };
  const loop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    const miliSeconds = state.cueWorkout.params.time * 1000 - elapsedTime;
    if (miliSeconds > 0) {
      setMiliSeconds(miliSeconds);
      loopIdRef.current = window.requestAnimationFrame(loop);
      return;
    }
    stop();
  };

  const next = async () => {
    let updatedCue = state.cueWorkout.cue;

    while (getCueString(updatedCue) === getCueString(state.cueWorkout.cue)) {
      updatedCue = createCueFromParams(state.cueWorkout.params);
    }
    await setCueWorkoutCue(updatedCue);
    const newParams: CueWorkoutParams = {
      ...state.cueWorkout.params,
      points: state.cueWorkout.params.points + 1,
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
        <CardList
          list={COLORS}
          columns={6}
          selectedList={state.cueWorkout.params.colors}
        />
        <CardList
          list={VERBS}
          columns={6}
          selectedList={state.cueWorkout.params.verbs}
        />

        <div style={{ marginBottom: -20, marginTop: 20 }}>
          <Points />
        </div>
        <TimeDisplay miliSeconds={miliSeconds} />
        <div style={{ margin: '16px 0', height: 200 }}>
          {state.cueWorkout.params.isRunning && (
            <CuePane cueWorkout={state.cueWorkout} />
          )}
        </div>
        <PlayButton start={start} next={next} />
      </div>
    </Container>
  );
};

export default CueWorkoutPane;
