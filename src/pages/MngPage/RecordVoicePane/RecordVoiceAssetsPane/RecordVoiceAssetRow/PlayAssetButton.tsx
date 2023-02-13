import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../../App';
import { VoiceProps } from '../../../../../Model';
import { createSourceNode } from '../../../../../services/utils';

const PlayAssetButton = ({ asset }: { asset: VoiceProps }) => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const audioBuffer = state.audioBuffers[asset.storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers]);

  const play = () => {
    if (!state.audioContext || !audioBuffer) return;
    console.log(`%c${asset.id}`, 'color:green');
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start(0, asset.startAt, asset.stopAt - asset.startAt);
  };
  if (!audioBuffer) return <></>;
  return (
    <IconButton size='small' onClick={play}>
      <PlayArrow />
    </IconButton>
  );
};

export default PlayAssetButton;
