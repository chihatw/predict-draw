import { IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';

import NotesRow from './NotesRow';
import KanasRow from './KanasRow';
import { BeatScheduler } from '../classes/BeatScheduler';
import { DisplayScheduler } from '../classes/DisplayScheduler';
import { createAudioContext } from '../../../services/utils';

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
  const displaySchedulerRef = useRef<DisplayScheduler | null>(null);

  const [progress, setProgress] = useState(0); // xPos 表示のために利用
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    // 0 の時は無視
    if (!superStartAt) return;

    // superStartAtが更新された場合、 start
    if (superStartAt !== startAtRef.current) {
      startAtRef.current = performance.now(); // ローカルの基準値を設定
      start(startAtRef.current);
    }
    return () => {
      // コンポーネント削除時に初期化
      !!superUpdateStartAt && superUpdateStartAt(0);
    };
  }, [superStartAt]);

  useEffect(() => {
    // 0 の時は無視
    if (!superStopAt) return;
    // superStopAtが更新された場合、 stop
    stop();
    return () => {
      // コンポーネント削除時に初期化
      !!superUpdateStopAt && superUpdateStopAt(0);
    };
  }, [superStopAt]);

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

    displaySchedulerRef.current = new DisplayScheduler({
      bpm,
      type,
      bpmPitchesArray,
      syncopationRatio,
    });
    loopId.current = requestAnimationFrame(loop);
  };

  const loop = () => {
    const now = performance.now();
    const beatScheduler = beatSchedulerRef.current;
    const displayScheduler = displaySchedulerRef.current;

    // 打拍
    !!beatScheduler && beatScheduler.tick(now);

    // 経過時間
    const elapsedTime = now - startAtRef.current;

    // ハイライト
    const activeIndex = !!displayScheduler
      ? displayScheduler.getActiveIndex(elapsedTime)
      : -1;
    setActiveIndex(activeIndex);

    const progress = !!displayScheduler
      ? displayScheduler.getProgress(elapsedTime)
      : 0;
    setProgress(progress);

    // 自己呼び出し
    loopId.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);

    cancelAnimationFrame(loopId.current);
    setActiveIndex(-1);

    displaySchedulerRef.current = null;
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
            progress={progress}
            activeIndex={type === 'syncopation' ? activeIndex : -1}
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
                activeIndex={type !== 'syncopation' ? activeIndex : -1}
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
