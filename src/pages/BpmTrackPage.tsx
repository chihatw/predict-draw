import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Container } from '@mui/material';
import { BpmPlayer } from '@chihatw/lang-gym-h.card.ui.bpm-player';
import React, { useContext } from 'react';

import AppContext from '../services/context';

const BpmTrackPage = () => {
  const {
    bpmTrackBpm,
    bpmTrackType,
    bpmTrackStopAt,
    bpmTrackOffsets,
    bpmTrackStartAt,
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
            offsets={bpmTrackOffsets}
            superStopAt={bpmTrackStopAt}
            superStartAt={bpmTrackStartAt}
            bpmPitchesArray={bpmTrackBpmPitchesArray}
            scale={1.3}
          />
        </div>
      </div>
    </Container>
  );
};

export default BpmTrackPage;
