import React from 'react';
import { IconButton } from '@mui/material';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';

const TimerButton = ({
  isRunning,
  handleClick,
}: {
  isRunning: boolean;
  handleClick: () => void;
}) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton color='primary' onClick={handleClick}>
      {isRunning ? (
        <StopCircleRounded sx={{ fontSize: 120 }} />
      ) : (
        <PlayCircleRounded sx={{ fontSize: 120 }} />
      )}
    </IconButton>
  </div>
);

export default TimerButton;
