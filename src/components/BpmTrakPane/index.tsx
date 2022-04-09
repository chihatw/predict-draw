import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import bpmPitchesArray2Offsets from 'bpm-pitches-array2offsets';
import { Container, IconButton } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MusicNote,
  PlayCircleRounded,
  StopCircleRounded,
} from '@mui/icons-material';

import useBpmTrack from '../../services/useBpmTrack';

const BpmTrackPage = () => {
  const { bpm, trackType, offsets, syncopationRatio, bpmPitchesArray } =
    useBpmTrack();
  return (
    <Container maxWidth='sm' sx={{ display: 'grid', rowGap: 5 }}>
      <BpmPane bpm={bpm} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BpmPlayer
          bpm={bpm}
          type={trackType}
          scale={1.3}
          offsets={offsets}
          syncopationRatio={syncopationRatio}
          bpmPitchesArray={bpmPitchesArray}
        />
      </div>
    </Container>
  );
};

export default BpmTrackPage;

const BpmPlayer = ({
  bpm,
  type,
  scale,
  offsets,
  bpmPitchesArray,
  syncopationRatio,
  superUpdateStopAt,
  superUpdateStartAt,
  superUpdateIsPlaying,
}: {
  bpm: number;
  type: string;
  scale?: number;
  offsets: number[];
  bpmPitchesArray: string[][][];
  syncopationRatio: number;
  superUpdateStopAt?: (value: number) => void;
  superUpdateStartAt?: (value: number) => void;
  superUpdateIsPlaying?: (value: boolean) => void;
}) => {
  const timer = useMemo(() => new Timer(), []);

  const loopId = useRef(0);
  const pitchesRef = useRef<Pitches | null>(null);
  const metronomeRef = useRef<Metronome | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const start = () => {
    if (!audioContextRef.current) return;
    setIsPlaying(true);
    !!superUpdateIsPlaying && superUpdateIsPlaying(true);
    const now = performance.now();

    timer.startAt = now;
    metronomeRef.current = new Metronome({
      bpm,
      type,
      startAt: now,
      audioContext: audioContextRef.current,
      bpmPitchesArray,
      syncopationRatio,
    });

    pitchesRef.current = new Pitches({
      bpm,
      type,
      bpmPitchesArray,
      syncopationRatio,
    });
    loopId.current = requestAnimationFrame(loop);
    !!superUpdateStartAt && superUpdateStartAt(Date.now());
  };

  const loop = () => {
    const now = performance.now();
    const pitches = pitchesRef.current;
    const metronome = metronomeRef.current;

    // 打拍
    !!metronome && metronome.tick(now);

    // 経過時間
    const elapsedTime = timer.elapsedTime(now);

    // ハイライト
    const activeIndex = !!pitches ? pitches.getActiveIndex(elapsedTime) : -1;
    setActiveIndex(activeIndex);

    const progress = !!pitches ? pitches.getProgress(elapsedTime) : 0;
    setProgress(progress);

    // 自己呼び出し
    loopId.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);
    !!superUpdateIsPlaying && superUpdateIsPlaying(false);

    cancelAnimationFrame(loopId.current);
    setActiveIndex(-1);

    pitchesRef.current = null;
    metronomeRef.current = null;
    !!superUpdateStopAt && superUpdateStopAt(Date.now());
  };

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      if (!audioContextRef.current) {
        audioContextRef.current = new window.AudioContext();
        const audioContext = audioContextRef.current;
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);

        gainNode.gain.value = 0;
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.01);
      }
      if (!!audioContextRef.current) {
        start();
      }
    }
  };

  return (
    <div style={{ display: 'grid', rowGap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <NotesPane
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
            <PitchesPane
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
  );
};

class Timer {
  private _startAt: number = 0;
  set startAt(value: number) {
    this._startAt = value;
  }
  elapsedTime(now: number) {
    return Math.floor(now - this._startAt);
  }
}

class Pitches {
  private _startAts: number[];
  private _beatRate: number;
  private _blockCount: number;
  private _isSycopation: boolean;
  private _syncopationRatio: number;

  constructor({
    bpm,
    type,
    bpmPitchesArray,
    syncopationRatio,
  }: {
    bpm: number;
    type: string;
    bpmPitchesArray: string[][][];
    syncopationRatio: number;
  }) {
    let beatRate = 0;
    let track: number[] = [];
    switch (type) {
      case 'syncopation':
        track = syncopationRatio === 0 ? [0, -1, 0, -1] : [0, 0, 0, 0];
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'mora':
      case 'onebyone':
        track = bpmPitchesArray2MoraTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'syllable':
        track = bpmPitchesArray2SyllableTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / bpm;
        break;
    }
    this._startAts = bpmPitchesArray2Offsets(bpmPitchesArray);
    this._beatRate = beatRate;
    this._blockCount = track.length;
    this._isSycopation = type === 'syncopation';
    this._syncopationRatio = syncopationRatio;
  }

  get offsets() {
    return this._startAts;
  }

  getActiveIndex(elapsedTime: number) {
    const elapsedCountPair = Math.floor(elapsedTime / (this._beatRate * 2));
    const extraTime = elapsedTime - elapsedCountPair * (this._beatRate * 2);

    const syncopation = this._beatRate * ((100 - this._syncopationRatio) / 100);
    const extraCount = extraTime > this._beatRate - syncopation ? 1 : 0;

    const elapsedCount = elapsedCountPair * 2 + extraCount;
    return Math.floor(elapsedCount % this._blockCount);
  }

  getProgress(elapsedTime: number) {
    const totalTime = this._beatRate * 4;
    const extraTime = Math.floor(elapsedTime % totalTime);
    return this._isSycopation ? Math.floor((extraTime / totalTime) * 100) : 0;
  }
}

const bpmPitchesArray2MoraTrack = (bpmPitchesArray: string[][][]) => {
  const moraTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    for (const pitch of line) {
      const mora = pitch[0];
      const isHighPitch = !!pitch[1];
      let beat: number = -1;
      // 空文字列、っ、ッ、は -1のまま（無音）
      if (!['', 'っ', 'ッ'].includes(mora)) {
        // 高音は1, 低音は0を代入
        beat = isHighPitch ? 1 : 0;
      }
      moraTrack.push(beat);
    }
  }
  return moraTrack;
};

const bpmPitchesArray2SyllableTrack = (bpmPitchesArray: string[][][]) => {
  let syllableTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    syllableTrack = syllableTrack.concat(new Array(syllableCount).fill(0));
  }
  return syllableTrack;
};

// const bpmPitchesArray2MoraTrack = (bpmPitchesArray: string[][][]) => {
//   const track: number[] = [];
//   for (const line of bpmPitchesArray) {
//     for (const pitch of line) {
//       const mora = pitch[0];
//       const isHighPitch = !!pitch[1];
//       let beat: number = -1;
//       // 空文字列、っ、ッ、は -1のまま（無音）
//       if (!['', 'っ', 'ッ'].includes(mora)) {
//         // 高音は1, 低音は0を代入
//         beat = isHighPitch ? 1 : 0;
//       }
//       track.push(beat);
//     }
//   }
//   return track;
// };

const bpmPitchesArray2OneByOneTrack = (bpmPitchesArray: string[][][]) => {
  let track: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    for (let i = 0; i < syllableCount; i++) {
      track.push(0);
      track.push(-1);
    }
  }
  return track;
};

// const bpmPitchesArray2SyllableTrack = (bpmPitchesArray: string[][][]) => {
//   let track: number[] = [];
//   for (const line of bpmPitchesArray) {
//     const syllableCount = Math.ceil(line.length / 2);
//     track = track.concat(new Array(syllableCount).fill(0));
//   }
//   return track;
// };

class Metronome {
  private _beat: Beat;
  private _track: number[] = [];
  private _startAt: number;
  private _beatRate: number;
  private _syncopationRatio: number;

  private _index = 0;

  constructor({
    bpm,
    type,
    startAt,
    audioContext,
    bpmPitchesArray,
    syncopationRatio,
  }: {
    bpm: number;
    type: string;
    startAt: number;
    audioContext: AudioContext;
    bpmPitchesArray: string[][][];
    syncopationRatio: number;
  }) {
    let beatRate = 0;
    let track: number[] = [];

    switch (type) {
      case 'syncopation':
        track = syncopationRatio === 0 ? [0, -1, 0, -1] : [0, 0, 0, 0];
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'mora':
        track = bpmPitchesArray2MoraTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'onebyone':
        track = bpmPitchesArray2OneByOneTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'syllable':
        track = bpmPitchesArray2SyllableTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / bpm;
        break;
    }

    this._beat = new Beat(audioContext);
    this._track = track;
    this._startAt = startAt;
    this._beatRate = beatRate;
    this._syncopationRatio = syncopationRatio;
  }

  tick(now: number) {
    const beatElapsedTime = now - this._startAt;
    if (beatElapsedTime > 0) {
      const syncopation =
        (!!(this._index % 2) ? 1 : -1) *
        ((this._beatRate * (100 - this._syncopationRatio)) / 100);
      this._startAt += this._beatRate + syncopation;
      const pitch = this._track[this._index];
      if (pitch > -1) {
        this._beat.play(pitch > 0 ? 1000 : 800);
      }

      this._index = (this._index + 1) % this._track.length;
    }
  }
}

const PitchesPane = ({
  scale,
  isMora,
  startAt,
  pitches,
  isPlaying,
  activeIndex,
}: {
  scale?: number;
  isMora: boolean;
  pitches: string[][];
  startAt: number;
  isPlaying: boolean;
  activeIndex: number;
}) => (
  <>
    {pitches.map((pitch, pitchIndex) => {
      const index = startAt + pitchIndex;
      const isActive = isMora
        ? index === activeIndex
        : [activeIndex * 2, activeIndex * 2 + 1].includes(index);
      const isAccent =
        // ターゲットが高音
        !!pitch[1] &&
        // ターゲットの次にもpitchがある
        !!pitches[pitchIndex + 1] &&
        !!pitches[pitchIndex + 1][0] &&
        // ターゲットの次は低音
        !pitches[pitchIndex + 1][1];

      return (
        <PitchBlock
          key={pitchIndex}
          label={pitch[0]}
          height={40 * (scale || 1)}
          isAccent={isAccent}
          isHighPitch={!!pitch[1]}
          isTextHighlight={!isPlaying || isActive}
          isBackGroundHighlight={isActive}
          hasRightMergin={!!(pitchIndex % 2)}
        />
      );
    })}
  </>
);

const RED = '#f50057';
const GREEN = '#52a2aa';
const LIGHT_RED = '#fee0eb';
const LIGHT_GREEN = '#eaf4f5';

const PitchBlock = ({
  label,
  height,
  isAccent,
  isHighPitch,
  hasRightMergin,
  isTextHighlight,
  isBackGroundHighlight,
}: {
  label: string;
  height: number;
  isAccent: boolean;
  isHighPitch: boolean;
  isTextHighlight: boolean;
  isBackGroundHighlight: boolean;
  hasRightMergin?: boolean;
}) => (
  <div
    style={{
      width: Math.floor(height / 2),
      height,
      border: '1px solid #eee',
      display: 'flex',
      boxSizing: 'border-box',
      textAlign: 'center',
      paddingTop: isHighPitch ? 0 : height * 0.3,
      background: isBackGroundHighlight
        ? isAccent
          ? LIGHT_RED
          : LIGHT_GREEN
        : 'white',
      justifyContent: 'center',
      paddingBottom: isHighPitch ? height * 0.3 : 0,
      marginRight: hasRightMergin ? 2 : 0,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: isTextHighlight ? (isAccent ? RED : GREEN) : 'inherit',
          fontSize: height * 0.3,
          whiteSpace: 'nowrap',
          transform: 'scaleX(0.8)',
          transformOrigin: 'center center',
        }}
      >
        {label}
      </span>
    </div>
  </div>
);

class Beat {
  private _audioContext: AudioContext | null = null;
  constructor(audioContext: AudioContext) {
    this._audioContext = audioContext;
  }
  play(hz?: number) {
    if (this._audioContext === null) {
      this._audioContext = new window.AudioContext();
    }
    const osc = this._audioContext.createOscillator();
    osc.frequency.value = hz || 1000;
    osc.connect(this._audioContext.destination);

    osc.start(this._audioContext.currentTime);
    osc.stop(this._audioContext.currentTime + 0.03);
  }
}

const NotesPane = ({
  height,
  progress,
  activeIndex,
  notePairCount,
  syncopationRatio,
}: {
  height: number;
  progress: number;
  activeIndex: number;
  notePairCount?: number;
  syncopationRatio: number;
}) => {
  const width = useMemo(() => height / 2, []);
  const noteCount = useMemo(() => (notePairCount || 2) * 2, [notePairCount]);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * noteCount;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!!progress) {
      let xPos = Math.floor(canvas.width * (progress / 100)) + width / 2;
      if (xPos > canvas.width) {
        xPos -= canvas.width;
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(xPos, 0);
      ctx.lineTo(xPos, canvas.height);
      ctx.stroke();
      ctx.closePath();
    }
  }, [progress]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: width * noteCount,
          height,
          background: 'white',
        }}
      >
        <div style={{ position: 'relative' }}>
          {new Array(noteCount).fill(null).map((_, index) => {
            let left: number;
            if (index % 2) {
              left = index * width - (width * (100 - syncopationRatio)) / 100;
            } else {
              left = index * width;
            }
            return (
              <div key={index} style={{ position: 'absolute', top: 0, left }}>
                <Note height={height} isActive={activeIndex === index} />
              </div>
            );
          })}
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

const Note = ({ height, isActive }: { height: number; isActive: boolean }) => (
  <div
    style={{
      width: height / 2,
      height: height,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        transform: 'scaleY(1.2)',
        transformOrigin: 'top center',
      }}
    >
      <MusicNote
        sx={{ fontSize: height / 2, color: isActive ? RED : 'inherit' }}
      />
    </div>
  </div>
);
