import { useEffect, useMemo, useRef, useState } from 'react';

import PitchesPane from './components/PitchesPane';
import { Metronome, Pitches, Timer } from './classes';

const BPMPlayer = ({
  bpm,
  type,
  scale,
  offsets,
  superStopAt,
  superStartAt,
  bpmPitchesArray,
}: {
  bpm: number;
  type: string;
  scale?: number;
  offsets: number[];
  superStopAt: number;
  superStartAt: number;
  bpmPitchesArray: string[][][];
}) => {
  console.log(
    JSON.stringify({
      bpm,
      type,
      scale,
      offsets,
      superStopAt,
      superStartAt,
      bpmPitchesArray,
    })
  );

  const timer = useMemo(() => new Timer(), []);

  const loopId = useRef(0);
  const pitchesRef = useRef<Pitches | null>(null);
  const metronomeRef = useRef<Metronome | null>(null);

  const [stopAt, setStopAt] = useState(superStopAt);
  const [startAt, setStartAt] = useState(superStartAt);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (startAt !== 0 && startAt !== superStartAt) {
      start();
    }
    setStartAt(superStartAt);
  }, [superStartAt]);

  useEffect(() => {
    if (stopAt !== 0 && stopAt !== superStopAt) {
      stop();
    }
    setStopAt(superStopAt);
  }, [superStopAt]);

  const start = () => {
    setIsPlaying(true);
    const now = performance.now();

    timer.startAt = now;
    metronomeRef.current = new Metronome({
      bpm,
      type,
      startAt: now,
      bpmPitchesArray,
    });

    pitchesRef.current = new Pitches({
      bpm,
      type,
      bpmPitchesArray,
    });
    loopId.current = requestAnimationFrame(loop);
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

    // 自己呼び出し
    loopId.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);
    cancelAnimationFrame(loopId.current);
    setActiveIndex(-1);

    pitchesRef.current = null;
    metronomeRef.current = null;
  };

  return (
    <div
      style={{
        display: 'grid',
        rowGap: 4,
        transform: `scale(${scale || 1.0})`,
        transformOrigin: 'left top',
      }}
    >
      {bpmPitchesArray.map((pitches, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <PitchesPane
            isMora={['mora', 'onebyone'].includes(type)}
            pitches={pitches}
            startAt={offsets[index]}
            isPlaying={isPlaying}
            activeIndex={activeIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default BPMPlayer;
