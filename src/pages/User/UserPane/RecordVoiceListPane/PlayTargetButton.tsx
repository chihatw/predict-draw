import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { INITIAL_VOICE_PROPS } from '../../../../Model';
import { setRecordVoiceLogs } from '../../../../services/recordVoice';
import { createSourceNode } from '../../../../services/utils';

const PlayTargetButton = ({ id }: { id: string }) => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [asset, setAsset] = useState(INITIAL_VOICE_PROPS);

  useEffect(() => {
    const asset = state.recordVoice.assets[id];
    setAsset(asset);
    if (!asset) return;
    const audioBuffer = state.audioBuffers[asset.storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers, state.recordVoice.assets, id]);

  if (!asset) return <></>;

  const play = () => {
    if (!state.audioContext || !audioBuffer) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start(0, asset.startAt, asset.stopAt - asset.startAt);
    setRecordVoiceLogs({
      selected: `${asset.pitchStr}(target),${Date.now()}`,
    });
  };

  return (
    <IconButton sx={{ color: '#52a2aa' }} onClick={play}>
      <PlayArrow sx={{ fontSize: 120 }} />
    </IconButton>
  );
};

export default PlayTargetButton;
