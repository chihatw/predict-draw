import { Container } from '@mui/material';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';

import BPMSlider from './components/BPMSlider';
import useBpmTrack from '../../services/useBpmTrack';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import { useMemo, useState } from 'react';

const MngBPMTrackPane = () => {
  const {
    bpm,
    trackType,
    bpmPitchesArray,
    syncopationRatio,
    updateBpm,
    updateOffsets,
    updateTrackType,
    updateSyncopationRatio,
    updateBpmPitchesArray,
  } = useBpmTrack();

  const [pitchesArrayLines, setPitchesArrayLines] = useState<string[][][][]>(
    []
  );
  const handleChangeInput = (value: string) => {
    const lines = value.split('\n').filter((i) => i);
    const pitchesArrayLines: string[][][][] = [];
    for (const line of lines) {
      const pitchesArray = string2PitchesArray(line);
      pitchesArrayLines.push(pitchesArray);
    }
    setPitchesArrayLines(pitchesArrayLines);
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
          bpmPitchesArray={bpmPitchesArray}
          updateOffsets={updateOffsets}
          updateBpmPitchesArray={updateBpmPitchesArray}
          superHandleChangeInput={handleChangeInput}
        />
        {pitchesArrayLines.map((pitchesArray, index) => (
          <div key={index}>
            <SentencePitchLine pitchesArray={pitchesArray} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MngBPMTrackPane;
