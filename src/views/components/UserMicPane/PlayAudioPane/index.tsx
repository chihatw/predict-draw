import { IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { StopCircle } from '@mui/icons-material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audioBuffers/core/2-services';
import { RAW_PATH } from 'application/recordVoiceParms/core/1-constants';
import { RootState } from 'main';

const PlayAudioPane = () => {
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
    <div
      style={{
        display: 'flex',
        height: 136,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconButton sx={{ color: '#52a2aa' }} onClick={handleClick}>
        {isPlaying ? (
          <StopCircle sx={{ fontSize: 120 }} />
        ) : (
          <PlayArrow sx={{ fontSize: 120 }} />
        )}
      </IconButton>
    </div>
  );
};

export default PlayAudioPane;
