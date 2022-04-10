import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Container } from '@mui/material';
import React, { useMemo } from 'react';

import BpmPlayer from '../components/BpmPlayer';
import useBpmTrack from '../../../services/useBpmTrack';
import { pitchesArrayLines2BpmPitchesArray } from '../services/utils';

const BpmTrackPane = () => {
  const {
    bpm,
    stopAt,
    offsets,
    startAt,
    trackType,
    syncopationRatio,
    pitchesArrayLines,
    setStopAt,
    setStartAt,
  } = useBpmTrack();
  const bpmPitchesArray = useMemo(() => {
    return pitchesArrayLines2BpmPitchesArray(pitchesArrayLines);
  }, [pitchesArrayLines]);
  return (
    <Container maxWidth='sm' sx={{ display: 'grid', rowGap: 5 }}>
      <BpmPane bpm={bpm} />

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
    </Container>
  );
};

export default BpmTrackPane;
