import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { createSourceNode } from '../../../../../../../services/utils';

const AnswerRowPlayButton = ({
  blob,
  audioContext,
  start,
  end,
}: {
  blob: Blob;
  audioContext: AudioContext;
  start: number;
  end: number;
}) => {
  const play = async () => {
    const sourceNode = await createSourceNode(blob, audioContext);
    sourceNode.start(0, start, end - start);
  };

  return (
    <IconButton color='primary' onClick={play}>
      <PlayArrow />
    </IconButton>
  );
};

export default AnswerRowPlayButton;
