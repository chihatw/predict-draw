import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

import { audioBuffersActions } from 'application/audioBuffers/framework/0-reducer';
import { RAW_PATH } from 'application/recordVoiceParams/core/1-constants';
import { useDispatch } from 'react-redux';
import PlayAudioPane from './PlayAudioPane';
import RecButton from './RecButton';
import TargetPitchPane from './TargetPitchPane';

const UserMicPane = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;
    dispatch(audioBuffersActions.getAudioBufferStart(RAW_PATH));
    setInitializing(false);
  }, [initializing]);

  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', paddingTop: 80, rowGap: 40 }}>
        <div>
          <TargetPitchPane />
          <RecButton />
        </div>
        <PlayAudioPane />
      </div>
    </Container>
  );
};

export default UserMicPane;
