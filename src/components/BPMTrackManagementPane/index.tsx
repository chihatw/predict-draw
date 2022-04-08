import { Container } from '@mui/material';
import useBpmTrack from '../../services/useBpmTrack';

import BPMSlider from './components/BPMSlider';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';

const BPMTrackManagementPane = () => {
  const {
    bpm,
    updateBpm,
    trackType,
    updateTrackType,
    syncopationRatio,
    updateSyncopationRatio,
    bpmPitchesArray,
    updateOffsets,
    updateBpmPitchesArray,
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
          bpmPitchesArray={bpmPitchesArray}
          updateOffsets={updateOffsets}
          updateBpmPitchesArray={updateBpmPitchesArray}
        />
      </div>
    </Container>
  );
};

export default BPMTrackManagementPane;
