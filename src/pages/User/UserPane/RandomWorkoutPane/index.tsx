import React, { useContext, useEffect, useRef, useState } from 'react';
import { Cue, INITIAL_CUE, INITIAL_RANDOM_WORKOUT } from '../../../../Model';
import AppContext from '../../../../services/context';
import RandomWorkoutHeader from './RandomWorkoutHeader';
import RandomWorkoutTime from './RandomWorkoutTime';
import {
  nextCue,
  resetRandomWorkout,
  setRandomWorkoutIsRunning,
  startRandomWorkout,
} from '../../../../services/randomWorkout';
import { shuffle } from '../../../../services/utils';
import RandomWorkoutTimerButton from './RandomWorkoutTimerButton';
import RandomWorkoutCard from './RandomWorkoutCard';
import { Button } from '@mui/material';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../../repositories/firebase';
import { ActionTypes } from '../../../../Update';

const RandomWorkoutPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const { randomWorkout } = state;
  const { workoutId, workouts, params, blobURLs } = randomWorkout;
  const workout = workouts[workoutId] || INITIAL_RANDOM_WORKOUT;
  const { cues, roundCount } = workout;
  const { time, cueIds, isRunning, isChecked, currentIndex } = params;
  const [miliSeconds, setMiliSeconds] = useState(0);
  const loopIdRef = useRef(0);
  const startAtRef = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!dispatch) return;
    let isLoaded = true;
    for (const cue of cues) {
      const { imagePath } = cue;
      if (imagePath) {
        const memoBlobURL = blobURLs[imagePath];
        if (!memoBlobURL) {
          isLoaded = false;
          const fetchData = async () => {
            console.log('get imageBlob');
            const downloadURL = await getDownloadURL(ref(storage, imagePath));
            const response = await fetch(downloadURL);
            const blob = await response.blob();
            const blobURL = window.URL.createObjectURL(blob);
            dispatch({
              type: ActionTypes.setRandomWorkoutBlobURL,
              payload: { imagePath, blobURL },
            });
          };
          fetchData();
        }
      }
    }
    setIsLoaded(isLoaded);
  }, [cues, blobURLs]);

  const start = () => {
    let shuffledCueIds: string[] = [];
    const cueIds = cues.map(({ id }) => id);
    for (let i = 0; i < roundCount; i++) {
      shuffledCueIds = shuffledCueIds.concat(shuffle(cueIds));
    }
    startRandomWorkout(shuffledCueIds);
    startAtRef.current = performance.now();
    loopIdRef.current = window.requestAnimationFrame(loop);
  };
  const loop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setMiliSeconds(elapsedTime);
    loopIdRef.current = window.requestAnimationFrame(loop);
  };
  const next = () => {
    nextCue(currentIndex + 1);
  };
  const stop = () => {
    setRandomWorkoutIsRunning(false);
    window.cancelAnimationFrame(loopIdRef.current);
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setMiliSeconds(elapsedTime);
  };
  const reset = () => {
    window.cancelAnimationFrame(loopIdRef.current);
    resetRandomWorkout();
    setMiliSeconds(0);
  };

  if (!workout.id || !isLoaded) return <></>;

  const cue =
    cues.find((item) => item.id === cueIds[currentIndex]) || INITIAL_CUE;
  return (
    <div>
      <RandomWorkoutHeader workout={workout} />
      <RandomWorkoutTime miliSeconds={miliSeconds} />
      <div style={{ height: 320 }}>
        {isRunning && <RandomWorkoutCard cue={cue} />}
      </div>
      <RandomWorkoutTimerButton
        start={start}
        stop={stop}
        next={next}
        isRunning={isRunning}
        hasNext={currentIndex !== cueIds.length - 1}
      />
      <div style={{ height: 24 }} />
      <RandomWorkoutResetButton reset={reset} />
      <div style={{ height: 120 }} />
    </div>
  );
};

export default RandomWorkoutPane;

const RandomWorkoutResetButton = ({ reset }: { reset: () => void }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant='outlined' sx={{ width: 260 }} onClick={reset}>
        RESET
      </Button>
    </div>
  );
};
