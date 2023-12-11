import {
    pauseSourceNode,
    playAudioBufferAndSetSourceNode,
} from '@/application/audioBuffers/core/2-services';
import { IRecordVoiceAsset } from '@/application/recordVoiceAssets/core/0-interface';
import { RECORD_VOICE_STORAGE_PATH } from '@/application/recordVoiceParams/core/1-constants';
import { PlayArrow, StopCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { RootState } from 'main';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const PlayAssetButton = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const audioBuffer = useSelector(
    (state: RootState) =>
      state.audioBuffers.entities[RECORD_VOICE_STORAGE_PATH + asset.id]
  );
  const sourceNodeRef = useRef<AudioBufferSourceNode | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!audioBuffer || !audioBuffer.audioBuffer) return;
    setIsPlaying(true);
    playAudioBufferAndSetSourceNode(
      audioBuffer.audioBuffer,
      asset.startAt,
      asset.stopAt,
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
  if (!audioBuffer || !audioBuffer.audioBuffer) return <></>;
  return (
    <IconButton size='small' onClick={handleClick}>
      {isPlaying ? <StopCircle /> : <PlayArrow />}
    </IconButton>
  );
};

export default PlayAssetButton;
