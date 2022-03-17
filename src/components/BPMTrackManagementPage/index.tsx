import { Container } from '@mui/material';
import { useContext } from 'react';

import BPMSlider from './components/BPMSlider';
import { BpmPlayer } from '@chihatw/lang-gym-h.card.ui.bpm-player';
import AppContext from '../../services/context';
import StartButton from './components/StartButton';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';

const BPMTrackManagementPage = () => {
  const {
    bpmTrackBpm,
    bpmTrackType,
    bpmTrackStopAt,
    bpmTrackOffsets,
    bpmTrackStartAt,
    bpmTrackBpmPitchesArray,
  } = useContext(AppContext);
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <TrackTypeRadioButtons />
        <BPMSlider />
        <TrackTextForm />
        <StartButton />
        <BpmPlayer
          bpm={bpmTrackBpm}
          type={bpmTrackType}
          offsets={bpmTrackOffsets}
          superStopAt={bpmTrackStopAt}
          superStartAt={bpmTrackStartAt}
          bpmPitchesArray={bpmTrackBpmPitchesArray}
        />
      </div>
    </Container>
  );
};

export default BPMTrackManagementPage;
