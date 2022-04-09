import React, { useMemo } from 'react';
import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Container } from '@mui/material';

import useBpmTrack from '../../../services/useBpmTrack';
import BpmPlayer from './components/BpmPlayer';
import { pitchesArrayLines2BpmPitchesArray } from '../services/utils';

const BpmTrackPane = () => {
  const { bpm, trackType, offsets, syncopationRatio, pitchesArrayLines } =
    useBpmTrack();
  const bpmPitchesArray = useMemo(() => {
    return pitchesArrayLines2BpmPitchesArray(pitchesArrayLines);
  }, [pitchesArrayLines]);
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

export default BpmTrackPane;
