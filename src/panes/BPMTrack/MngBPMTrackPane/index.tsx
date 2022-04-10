import React from 'react';
import { Container } from '@mui/material';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';

import BPMSlider from './components/BPMSlider';
import BpmPlayer from '../components/BpmPlayer';
import useBpmTrack from '../../../services/useBpmTrack';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';

const MngBPMTrackPane = () => {
  const {
    bpm,
    stopAt,
    startAt,
    trackType,
    indexOffsets,
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
        {trackType === 'syncopation' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'grid', rowGap: 8 }}>
              {pitchesArrayLines.map((pitchesArray, index) => (
                <div key={index}>
                  <SentencePitchLine pitchesArray={pitchesArray} hasBorders />
                </div>
              ))}
            </div>
          </div>
        )}

        <BpmPlayer
          bpm={bpm}
          type={trackType}
          scale={1.3}
          superStopAt={stopAt}
          indexOffsets={indexOffsets}
          superStartAt={startAt}
          syncopationRatio={syncopationRatio}
          pitchesArrayLines={pitchesArrayLines}
          superUpdateStopAt={setStopAt}
          superUpdateStartAt={setStartAt}
        />
      </div>
    </Container>
  );
};

export default MngBPMTrackPane;
