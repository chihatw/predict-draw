import { IconButton } from '@mui/material';

import PlayArrow from '@mui/icons-material/PlayArrow';

import { StopCircle } from '@mui/icons-material';
import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from 'application/audioBuffers/core/2-services';
import { RAW_PATH } from 'application/recordVoiceParms/core/1-constants';
import { RootState } from 'main';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PlayAudioPane = () => {
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH]
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 136,
          alignItems: 'center',
        }}
      >
        {!!rawAudioBuffer && !!rawAudioBuffer.audioBuffer && (
          <PlayButton audioBuffer={rawAudioBuffer.audioBuffer} />
        )}
      </div>
    </div>
  );
};

export default PlayAudioPane;

const PlayButton = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const dispatch = useDispatch();
  const sourceNodeRef = useRef<AudioBufferSourceNode | undefined>(undefined);
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH]
  );

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      pauseSourceNode(sourceNodeRef);
      setIsPlaying(false);
    };
  }, []);

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
  return (
    <IconButton sx={{ color: '#52a2aa' }} onClick={handleClick}>
      {isPlaying ? (
        <StopCircle sx={{ fontSize: 120 }} />
      ) : (
        <PlayArrow sx={{ fontSize: 120 }} />
      )}
    </IconButton>
  );
};
