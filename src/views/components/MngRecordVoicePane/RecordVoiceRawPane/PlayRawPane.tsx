import { PlayArrow, StopCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audioBuffers/core/2-services';

import { RAW_PATH } from 'application/recordVoiceParams/core/1-constants';
import { RootState } from 'main';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const PlayRawPane = () => {
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH]
  );
  const sourceNodeRef = useRef<AudioBufferSourceNode | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!rawAudioBuffer || !rawAudioBuffer.audioBuffer) return;
    setIsPlaying(true);
    playAudioBufferAndSetSourceNode(
      rawAudioBuffer.audioBuffer,
      0,
      rawAudioBuffer.audioBuffer.duration,
      sourceNodeRef,
      () => setIsPlaying(false)
    );
  };

  const pause = () => {
    setIsPlaying(false);
    pauseSourceNode(sourceNodeRef);
  };

  const handleClick = () => {
    if (isPlaying) {
      pause();
      return;
    }
    play();
  };

  if (!rawAudioBuffer || !rawAudioBuffer.audioBuffer) return <></>;
  return (
    <IconButton size='small' onClick={handleClick}>
      {isPlaying ? <StopCircle /> : <PlayArrow />}
    </IconButton>
  );
};

export default PlayRawPane;
