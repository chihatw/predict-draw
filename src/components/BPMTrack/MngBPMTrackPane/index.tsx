import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Container, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';

import BPMSlider from './components/BPMSlider';
import useBpmTrack from '../../../services/useBpmTrack';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';

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

  const loopId = useRef(0);
  const startAtRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      //
    } else {
      //
    }
    setIsPlaying(!isPlaying);
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
