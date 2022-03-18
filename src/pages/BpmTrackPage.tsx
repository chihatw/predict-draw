import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Container } from '@mui/material';
import { BpmPlayer } from '@chihatw/lang-gym-h.card.ui.bpm-player';
import React, { useContext } from 'react';

import AppContext from '../services/context';

const BpmTrackPage = () => {
  const {
    bpmTrackBpm,
    bpmTrackType,
    bpmTrackOffsets,
    syncopationRatio,
    bpmTrackBpmPitchesArray,
  } = useContext(AppContext);
  return (
    <Container maxWidth='sm' sx={{ display: 'grid', rowGap: 5 }}>
      <BpmPane bpm={bpmTrackBpm} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <BpmPlayer
            bpm={bpmTrackBpm}
            type={bpmTrackType}
            scale={1.3}
            offsets={bpmTrackOffsets}
            syncopationRatio={syncopationRatio}
            bpmPitchesArray={bpmTrackBpmPitchesArray}
          />
        </div>
      </div>
    </Container>
  );
};

export default BpmTrackPage;
