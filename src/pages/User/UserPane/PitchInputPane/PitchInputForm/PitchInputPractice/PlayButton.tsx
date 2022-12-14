import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { Schedule } from '../../../../../../Model';
import { playScheduledItem } from '../../../../../../pitchInputItems';

const PlayButton = ({
  schedules,
  audioBuffer,
  audioContext,
  AnimationElemRef,
}: {
  schedules: Schedule[];
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
  AnimationElemRef: React.RefObject<HTMLDivElement>;
}) => {
  const handleClickPlay = () => {
    playScheduledItem(schedules, audioBuffer, audioContext);
  };
  return (
    <div
      ref={AnimationElemRef}
      className={css({
        display: 'flex',
        justifyContent: 'center',
        opacity: 1,
        transition: 'all 0.5s ease-in-out',
        transform: 'translateY(0%)',
        '&.initial': {
          opacity: 0,
          transition: '0s',
          transform: 'translateY(30%)',
        },
      })}
    >
      <IconButton color='primary' onClick={handleClickPlay}>
        <PlayCircleRounded sx={{ fontSize: 120 }} />
      </IconButton>
    </div>
  );
};

export default PlayButton;
