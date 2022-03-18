import { Container } from '@mui/material';

import BPMSlider from './components/BPMSlider';
import SyncopationRatioSlider from './components/SyncopationRatioSlider';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';

const BPMTrackManagementPage = () => {
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <TrackTypeRadioButtons />
        <BPMSlider />
        <SyncopationRatioSlider />
        <TrackTextForm />
      </div>
    </Container>
  );
};

export default BPMTrackManagementPage;
