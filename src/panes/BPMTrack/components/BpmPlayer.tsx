import { IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';

import NotesRow from './NotesRow';
import KanasRow from './KanasRow';
import { BeatScheduler } from '../classes/BeatScheduler';
import { createAudioContext, useCallbackByTime } from '../../../services/utils';

const BpmPlayer = ({
  bpm,
  type,
  scale,
  offsets,
  superStopAt,
  superStartAt,
  bpmPitchesArray,
  syncopationRatio,
  superUpdateStopAt,
  superUpdateStartAt,
}: {
  bpm: number;
  type: string;
  scale?: number;
  offsets: number[];
  superStopAt?: number;
  superStartAt?: number;
  bpmPitchesArray: string[][][];
  syncopationRatio: number;
  superUpdateStopAt?: (value: number) => void;
  superUpdateStartAt?: (value: number) => void;
}) => {
  const loopId = useRef(0);
  const startAtRef = useRef(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const beatSchedulerRef = useRef<BeatScheduler | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [noteIndex, setNoteIndex] = useState(-1);
  const [xPosProgress, setXPosProgress] = useState(0);

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

    beatSchedulerRef.current = new BeatScheduler({
      bpm,
      type,
      startAt: now,
      audioContext: audioContextRef.current,
      bpmPitchesArray,
      syncopationRatio,
    });

    loopId.current = requestAnimationFrame(loop);
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', rowGap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NotesRow
            height={60}
            noteIndex={type === 'syncopation' ? noteIndex : -1}
            xPosProgress={type === 'syncopation' ? xPosProgress : 0}
            syncopationRatio={syncopationRatio}
          />
        </div>
        <div
          style={{
            display: 'grid',
            rowGap: 4,
          }}
        >
          {bpmPitchesArray.map((pitches, index) => (
            <div key={index} style={{ display: 'flex' }}>
              <KanasRow
                isMora={['mora', 'onebyone'].includes(type)}
                pitches={pitches}
                startAt={offsets[index]}
                isPlaying={type !== 'syncopation' && isPlaying}
                noteIndex={type !== 'syncopation' ? noteIndex : -1}
                scale={scale}
              />
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default BpmPlayer;
