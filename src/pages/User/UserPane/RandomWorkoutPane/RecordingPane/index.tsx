import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../../../../App';

import { INITIAL_CUE, INITIAL_RANDOM_WORKOUT } from '../../../../../Model';
import {
  nextCue,
  resetRandomWorkout,
  startRandomWorkout,
  stopRandomWorkout,
} from '../../../../../services/randomWorkout';
import { shuffle } from '../../../../../services/utils';

import TimeDisplay from '../../commons/TimeDisplay';

import TouchMe from './TouchMe';
import Card from './Card';
import CheckPane from './CheckPane';
import Header from './Header';
import ResetButton from './ResetButton';
import PlayButton from './PlayButton';

const RecordingPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const { randomWorkout, audioContext } = state;
  const { workoutId, workouts, params } = randomWorkout;
  const workout = workouts[workoutId] || INITIAL_RANDOM_WORKOUT;
  const { cues, roundCount } = workout;
  const { cueIds, isRunning, currentIndex } = params;
  const cue =
    cues.find((item) => item.id === cueIds[currentIndex]) || INITIAL_CUE;

  const [miliSeconds, setMiliSeconds] = useState(0);
  const loopIdRef = useRef(0);
  const startAtRef = useRef(0);

  const [blob, setBlob] = useState<Blob | null>(null);

  // streamと連携してマイクを切るため
  const micAudioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const start = async () => {
    // localhost の場合、 ios chrome では navigator が取得できない
    if (!navigator.mediaDevices || !audioContext || !dispatch) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const mediaRecorder = new MediaRecorder(stream);
    // データが入力された時の処理
    mediaRecorder.ondataavailable = async (event: BlobEvent) => {
      setBlob(event.data);
    };
    mediaRecorder.start();

    mediaRecorderRef.current = mediaRecorder;
    // AudioElementと stream を連携
    micAudioElemRef.current.srcObject = stream;

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
    window.cancelAnimationFrame(loopIdRef.current);
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    stopRandomWorkout(elapsedTime);
    setMiliSeconds(0);

    // 実際に録音ストップは 500ms後
    setTimeout(() => {
      let mediaRecorder = mediaRecorderRef.current;
      let audioElem = micAudioElemRef.current;
      if (!mediaRecorder) return;
      mediaRecorder.stop();
      const stream = audioElem.srcObject as MediaStream;
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      // ブラウザのマイク使用中の表示を消すために必要
      audioElem.srcObject = null;
      mediaRecorder = null;
    }, 500);
  };
  const reset = () => {
    window.cancelAnimationFrame(loopIdRef.current);
    resetRandomWorkout();
    setMiliSeconds(0);

    let mediaRecorder = mediaRecorderRef.current;
    let audioElem = micAudioElemRef.current;
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    const stream = audioElem.srcObject as MediaStream;
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    // ブラウザのマイク使用中の表示を消すために必要
    audioElem.srcObject = null;
    mediaRecorder = null;
  };

  if (!audioContext) return <TouchMe />;

  return (
    <div>
      <Header workout={workout} />
      <TimeDisplay miliSeconds={miliSeconds} />
      <div style={{ height: 320 }}>{isRunning && <Card cue={cue} />}</div>
      <PlayButton
        start={start}
        stop={stop}
        next={next}
        isRunning={isRunning}
        hasNext={currentIndex !== cueIds.length - 1}
      />
      <div style={{ height: 24 }} />
      <ResetButton reset={reset} />
      <div style={{ height: 120 }} />
      <CheckPane blob={blob} />
    </div>
  );
};

export default RecordingPane;
