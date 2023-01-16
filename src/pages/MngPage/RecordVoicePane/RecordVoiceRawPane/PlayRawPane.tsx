import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';

import { createSourceNode } from '../../../../services/utils';

const PlayRawPane = () => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const path = state.recordVoice.raw.storagePath;
    if (!path) {
      setAudioBuffer(null);
      return;
    }
    const audioBuffer = state.audioBuffers[path];
    if (!audioBuffer) {
      setAudioBuffer(null);
    }
    setAudioBuffer(audioBuffer);
  }, [state.recordVoice.raw.storagePath, state.audioBuffers]);

  const play = () => {
    if (!state.audioContext || !audioBuffer) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
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
