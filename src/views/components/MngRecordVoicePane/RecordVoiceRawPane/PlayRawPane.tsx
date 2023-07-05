import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../..';

import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import { createSourceNode } from '../../../../services/utils';

const PlayRawPane = () => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const path = RECORD_VOICE_STORAGE_PATH + 'raw';

    const audioBuffer = state.audioBuffers[path];
    if (!audioBuffer) {
      setAudioBuffer(null);
    }
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers]);

  const play = () => {
    if (!audioBuffer) return;
    const audioContext = new AudioContext();
    const sourceNode = createSourceNode(audioBuffer, audioContext);
    sourceNode.start();
  };
  if (!audioBuffer) return <></>;
  return (
    <IconButton size='small' onClick={play}>
      <PlayArrow />
    </IconButton>
  );
};

export default PlayRawPane;
