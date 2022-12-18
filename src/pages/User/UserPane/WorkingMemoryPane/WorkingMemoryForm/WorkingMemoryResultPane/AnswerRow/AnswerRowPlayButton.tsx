import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { createSourceNode } from '../../../../../../../services/utils';

const AnswerRowPlayButton = ({
  audioBuffer,
  audioContext,
  start,
  end,
}: {
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
  start: number;
  end: number;
}) => {
  const play = async () => {
    const sourceNode = createSourceNode(audioBuffer, audioContext);
    sourceNode.start(0, start, end - start);
  };

  return (
    <IconButton color='primary' onClick={play}>
      <PlayArrow />
    </IconButton>
  );
};

export default AnswerRowPlayButton;
