import { PlayCircleRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { createSourceNode } from '../../../../../services/utils';
import { WorkingMemoryFormState } from '../Model';

const PlayButton = ({ state }: { state: WorkingMemoryFormState }) => {
  const currentCueId = state.cueIds[state.currentIndex];
  const currentCue = state.cues[currentCueId];
  const play = async () => {
    if (!state.blob || !state.audioContext) return;
    const sourceNode = await createSourceNode(state.blob, state.audioContext);
    sourceNode.start(0, currentCue.start, currentCue.end - currentCue.start);
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 40,
          paddingBottom: 120,
          display: 'flex',
          justifyContent: 'center',
          color: '#555',
        }}
      >
        <div>
          <span>請</span>
          <span style={{ fontWeight: 'bold', margin: '0 2px' }}>記住</span>
          <span>播放的語音</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton color='primary' onClick={play}>
          <PlayCircleRounded sx={{ fontSize: 120 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default PlayButton;
