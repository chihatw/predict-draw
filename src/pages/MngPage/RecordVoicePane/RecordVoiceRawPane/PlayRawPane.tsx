import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';

import { createSourceNode } from '../../../../services/utils';

const PlayRawPane = () => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    if (!state.recordVoice.raw.storagePath) {
      setAudioBuffer(null);
      return;
    }
    const audioBuffer = state.audioBuffers[state.recordVoice.raw.storagePath];
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
