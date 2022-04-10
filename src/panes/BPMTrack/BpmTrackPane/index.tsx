import React from 'react';
import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Container } from '@mui/material';

import BpmPlayer from '../components/BpmPlayer';
import useBpmTrack from '../../../services/useBpmTrack';

const BpmTrackPane = () => {
  const {
    bpm,
    stopAt,
    startAt,
    trackType,
    indexOffsets,
    syncopationRatio,
    pitchesArrayLines,
    setStopAt,
    setStartAt,
  } = useBpmTrack();
  return (
    <Container maxWidth='sm' sx={{ display: 'grid', rowGap: 5 }}>
      <BpmPane bpm={bpm} />

      <BpmPlayer
        bpm={bpm}
        type={trackType}
        scale={1.3}
        superStopAt={stopAt}
        indexOffsets={indexOffsets}
        superStartAt={startAt}
        syncopationRatio={syncopationRatio}
        superUpdateStopAt={setStopAt}
        superUpdateStartAt={setStartAt}
        pitchesArrayLines={pitchesArrayLines}
      />
    </Container>
  );
};

export default BpmTrackPane;
