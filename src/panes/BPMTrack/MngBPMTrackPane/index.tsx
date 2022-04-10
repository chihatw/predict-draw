import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Container } from '@mui/material';
import React, { useMemo } from 'react';

import BPMSlider from './components/BPMSlider';
import BpmPlayer from '../components/BpmPlayer';
import useBpmTrack from '../../../services/useBpmTrack';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import { pitchesArrayLines2BpmPitchesArray } from '../services/utils';

const MngBPMTrackPane = () => {
  const {
    bpm,
    stopAt,
    offsets,
    startAt,
    trackType,
    syncopationRatio,
    pitchesArrayLines,
    updateBpm,
    setStopAt,
    setStartAt,
    updateOffsets,
    updateTrackType,
    updateSyncopationRatio,
    updatePitchesArrayLines,
  } = useBpmTrack();

  const bpmPitchesArray = useMemo(
    () => pitchesArrayLines2BpmPitchesArray(pitchesArrayLines),
    [pitchesArrayLines]
  );

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
        <BpmPlayer
          bpm={bpm}
          type={trackType}
          scale={1.3}
          offsets={offsets}
          superStopAt={stopAt}
          superStartAt={startAt}
          bpmPitchesArray={bpmPitchesArray}
          syncopationRatio={syncopationRatio}
          superUpdateStopAt={setStopAt}
          superUpdateStartAt={setStartAt}
        />
      </div>
    </Container>
  );
};

export default MngBPMTrackPane;
