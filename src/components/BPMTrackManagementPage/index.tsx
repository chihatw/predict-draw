import { Container } from '@mui/material';
import { useContext } from 'react';

import BPMSlider from './components/BPMSlider';
import BPMPlayer from './components/BPMPlayer';
import AppContext from '../../services/context';
import StartButton from './components/StartButton';
import TrackTextForm from './components/TrackTextForm';
import TrackTypeRadioButtons from './components/TrackTypeRadioButtons';

const BPMTrackManagementPage = () => {
  const {} = useContext(AppContext);
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <TrackTypeRadioButtons />
        <BPMSlider />
        <TrackTextForm />
        <StartButton />
        <BPMPlayer />
      </div>
    </Container>
  );
};

export default BPMTrackManagementPage;
