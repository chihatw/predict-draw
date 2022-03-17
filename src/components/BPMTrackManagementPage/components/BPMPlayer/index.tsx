import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import AppContext from '../../../../services/context';
import { Metronome } from './classes/Metronome';
import { Pitches } from './classes/Pitches';
import { Timer } from './classes/Timer';
import PitchesPane from './components/PitchesPane';

const BPMPlayer = () => {
  const {
    bpmTrackBpm,
    bpmTrackType,
    bpmTrackStopAt,
    bpmTrackOffsets,
    bpmTrackStartAt,
    bpmTrackBpmPitchesArray,
  } = useContext(AppContext);

  const timer = useMemo(() => new Timer(), []);

  const loopId = useRef(0);
  const pitchesRef = useRef<Pitches | null>(null);
  const metronomeRef = useRef<Metronome | null>(null);

  const [stopAt, setStopAt] = useState(bpmTrackStopAt);
  const [startAt, setStartAt] = useState(bpmTrackStartAt);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (startAt !== 0 && startAt !== bpmTrackStartAt) {
      start();
    }
    setStartAt(bpmTrackStartAt);
  }, [bpmTrackStartAt]);

  useEffect(() => {
    if (stopAt !== 0 && stopAt !== bpmTrackStopAt) {
      stop();
    }
    setStopAt(bpmTrackStopAt);
  }, [bpmTrackStopAt]);

  const start = () => {
    setIsPlaying(true);
    const now = performance.now();

    timer.startAt = now;
    metronomeRef.current = new Metronome({
      bpm: bpmTrackBpm,
      type: bpmTrackType,
      startAt: now,
      bpmPitchesArray: bpmTrackBpmPitchesArray,
    });

    pitchesRef.current = new Pitches({
      bpm: bpmTrackBpm,
      type: bpmTrackType,
      bpmPitchesArray: bpmTrackBpmPitchesArray,
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
        transform: 'scale(1.3)',
        transformOrigin: 'left top',
      }}
    >
      {bpmTrackBpmPitchesArray.map((pitches, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <PitchesPane
            isMora={['mora', 'onebyone'].includes(bpmTrackType)}
            pitches={pitches}
            startAt={bpmTrackOffsets[index]}
            isPlaying={isPlaying}
            activeIndex={activeIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default BPMPlayer;
