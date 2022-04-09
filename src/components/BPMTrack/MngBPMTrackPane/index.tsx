import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Container, IconButton } from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';

import BPMSlider from './components/BPMSlider';
import useBpmTrack from '../../../services/useBpmTrack';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';
import { BeatScheduler } from '../classes/BeatScheduler';
import { pitchesArrayLines2BpmPitchesArray } from '../services/utils';

const MngBPMTrackPane = () => {
  const {
    bpm,
    trackType,
    syncopationRatio,
    pitchesArrayLines,
    updateBpm,
    updateOffsets,
    updateTrackType,
    updateSyncopationRatio,
    updatePitchesArrayLines,
  } = useBpmTrack();

  const bpmPitchesArray = useMemo(
    () => pitchesArrayLines2BpmPitchesArray(pitchesArrayLines),
    [pitchesArrayLines]
  );

  const loopId = useRef(0);
  const startAtRef = useRef(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const beatSchedulerRef = useRef<BeatScheduler | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const start = () => {
    if (!audioContextRef.current) return;
    setIsPlaying(true);
    const now = performance.now();

    startAtRef.current = now;
    beatSchedulerRef.current = new BeatScheduler({
      bpm,
      type: trackType,
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

    // 打拍
    !!beatScheduler && beatScheduler.tick(now);

    // 経過時間
    const elapsedTime = now - startAtRef.current;

    // 自己呼び出し
    loopId.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);
    cancelAnimationFrame(loopId.current);
    beatSchedulerRef.current = null;
  };

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      //
    }
  };

  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <TrackTypeRadioButtons
          trackType={trackType}
          updateTrackType={updateTrackType}
        />
        <BPMSlider superBpm={bpm} updateBpm={updateBpm} />
        <SyncopationRatioSlider
          syncopationRatio={syncopationRatio}
          updateSyncopationRatio={updateSyncopationRatio}
        />
        <TrackTextForm
          pitchesArrayLines={pitchesArrayLines}
          updateOffsets={updateOffsets}
          updatePitchesArrayLines={updatePitchesArrayLines}
        />
        {pitchesArrayLines.map((pitchesArray, index) => (
          <div key={index}>
            <SentencePitchLine pitchesArray={pitchesArray} hasBorders />
          </div>
        ))}
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
    </Container>
  );
};

export default MngBPMTrackPane;
