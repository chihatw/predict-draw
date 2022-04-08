import React from 'react';
import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Container } from '@mui/material';
import { BpmPlayer } from '@chihatw/lang-gym-h.card.ui.bpm-player';

import useBpmTrack from '../services/useBpmTrack';

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
