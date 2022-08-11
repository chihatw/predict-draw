import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import { css, keyframes } from '@emotion/css';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../../../../services/context';

const rotate = keyframes`
  0%  {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
`;

const PlayButton = ({
  start,
  next,
}: {
  start: () => void;
  next: () => void;
}) => {
  const { state } = useContext(AppContext);
  const { cueWorkout } = state;
  const { params } = cueWorkout;
  const { isRunning, points } = params;

  const handleClick = () => {
    isRunning ? next() : start();
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <IconButton color='primary' onClick={handleClick}>
        {isRunning ? (
          <ChangeCircleIcon
            className={css`
              animation: ${rotate} 4s linear infinite;
            `}
            sx={{ fontSize: 120 }}
          />
        ) : points ? (
          <></>
        ) : (
          <PlayCircleRounded sx={{ fontSize: 120 }} />
        )}
      </IconButton>
    </div>
  );
};

export default PlayButton;
