import { IconButton } from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';

import NotesRow from './NotesRow';
import CountDown from './CountDown';
import BeatKanaTable from './BeatKanaTable';
import { PitchesArray } from '../../../services/useBpmTrack';
import { BeatScheduler } from '../classes/BeatScheduler';
import SentencePitchLines from './SentencePitchLines';
import { pitchesArrayLines2BpmPitchesArray } from '../services/utils';
import { createAudioContext, useCallbackByTime } from '../../../services/utils';

const BpmPlayer = ({
  bpm,
  type,
  scale,
  superStopAt,
  superStartAt,
  indexOffsets,
  syncopationRatio,
  pitchesArrayLines,
  superUpdateStopAt,
  superUpdateStartAt,
}: {
  bpm: number;
  type: string;
  scale?: number;
  superStopAt?: number;
  indexOffsets: number[];
  superStartAt?: number;
  syncopationRatio: number;
  pitchesArrayLines: PitchesArray[];
  superUpdateStopAt?: (value: number) => void;
  superUpdateStartAt?: (value: number) => void;
}) => {
  const loopId = useRef(0);
  const startAtRef = useRef(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const beatSchedulerRef = useRef<BeatScheduler | null>(null);

  const bpmPitchesArray = useMemo(
    () => pitchesArrayLines2BpmPitchesArray(pitchesArrayLines),
    [pitchesArrayLines]
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [noteIndex, setNoteIndex] = useState(-1);
  const [xPosProgress, setXPosProgress] = useState(0);
  const [countDownLabel, setCountDownLabel] = useState(4);
  const [countDownDisplay, setCountDownDisplay] = useState('none');

  useCallbackByTime({
    time: superStopAt,
    callback: () => stop(),
    resetTime: superUpdateStopAt,
  });

  useCallbackByTime({
    time: superStartAt,
    callback: () => {
      if (superStartAt !== startAtRef.current) {
        startAtRef.current = performance.now(); // ローカルの基準値を設定
        start(startAtRef.current);
      }
    },
    resetTime: superUpdateStartAt,
  });

  const start = (now: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    setIsPlaying(true);

    const hasCountDown = type !== 'syncopation';

    beatSchedulerRef.current = new BeatScheduler({
      bpm,
      type,
      startAt: now,
      audioContext: audioContextRef.current,
      bpmPitchesArray,
      syncopationRatio,
      hasCountDown,
    });

    loopId.current = requestAnimationFrame(loop);

    if (hasCountDown) {
      // カウントダウンの表示
      const interval = Math.floor((60 * 1000) / bpm);
      setCountDownDisplay('flex');
      let count = 0;
      let intervalId = 0;
      intervalId = window.setInterval(function () {
        setCountDownLabel(3 - count);
        count++;
        if (count > 3) {
          clearInterval(intervalId);
        }
      }, interval);
      setTimeout(() => {
        setCountDownDisplay('none');
        setCountDownLabel(4);
      }, interval * 4);
    }
  };

  const loop = () => {
    const now = performance.now();
    const beatScheduler = beatSchedulerRef.current;

    const { noteIndex, xPosProgress } = !!beatScheduler
      ? beatScheduler.tick(now)
      : { noteIndex: -1, xPosProgress: 0 };

    setNoteIndex(noteIndex);
    setXPosProgress(xPosProgress);

    // 自己呼び出し
    loopId.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);

    cancelAnimationFrame(loopId.current);
    setNoteIndex(-1);

    beatSchedulerRef.current = null;
  };

  const handleClick = () => {
    if (isPlaying) {
      !!superUpdateStopAt && superUpdateStopAt(performance.now());
      stop();
    } else {
      startAtRef.current = performance.now();
      !!superUpdateStartAt && superUpdateStartAt(startAtRef.current);
      start(startAtRef.current);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'grid', rowGap: 20 }}>
        {type === 'syncopation' ? (
          <NotesRow
            height={60}
            noteIndex={type === 'syncopation' ? noteIndex : -1}
            xPosProgress={type === 'syncopation' ? xPosProgress : 0}
            syncopationRatio={syncopationRatio}
          />
        ) : (
          <div style={{ display: 'grid', rowGap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SentencePitchLines pitchesArrayLines={pitchesArrayLines} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BeatKanaTable
                type={type}
                scale={scale}
                noteIndex={noteIndex}
                isPlaying={isPlaying}
                indexOffsets={indexOffsets}
                bpmPitchesArray={bpmPitchesArray}
              />
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton color='primary' onClick={handleClick}>
            {isPlaying ? (
              <StopCircleRounded sx={{ fontSize: 120 }} />
            ) : (
              <PlayCircleRounded sx={{ fontSize: 120 }} />
            )}
          </IconButton>
        </div>
      </div>
      <CountDown display={countDownDisplay} label={countDownLabel} />
    </div>
  );
};

export default BpmPlayer;
