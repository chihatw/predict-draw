import { Container, IconButton } from '@mui/material';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';

import BPMSlider from './components/BPMSlider';
import useBpmTrack from '../../../services/useBpmTrack';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import { useEffect, useRef, useState } from 'react';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';
import bpmPitchesArray2String from 'bpm-pitches-array2string';

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

  const loopId = useRef(0);
  const startAtRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [pitchesArrayLines, setPitchesArrayLines] = useState<string[][][][]>(
    []
  );

  useEffect(() => {
    const input = bpmPitchesArray2String(bpmPitchesArray);
    const pitchesArrayLines = input2PitchesArrayLines(input);
    setPitchesArrayLines(pitchesArrayLines);
  }, [bpmPitchesArray]);

  const handleChangeInput = (value: string) => {
    const pitchesArrayLines = input2PitchesArrayLines(value);
    setPitchesArrayLines(pitchesArrayLines);
  };

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

const input2PitchesArrayLines = (value: string) => {
  const lines = value.split('\n').filter((i) => i);
  const pitchesArrayLines: string[][][][] = [];
  for (const line of lines) {
    const pitchesArray = string2PitchesArray(line);
    pitchesArrayLines.push(pitchesArray);
  }
  return pitchesArrayLines;
};
