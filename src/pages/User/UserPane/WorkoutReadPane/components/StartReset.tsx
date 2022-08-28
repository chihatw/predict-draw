import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../../../../App';

const StartReset = ({
  handleClickReset,
  handleClickStart,
}: {
  handleClickReset: () => void;
  handleClickStart: () => void;
}) => {
  const { state } = useContext(AppContext);
  const { workoutParams } = state;
  const { checkedIndexes } = workoutParams;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {checkedIndexes.length ? (
        <ResetButton handleClickReset={handleClickReset} />
      ) : (
        <StartButton handleClickStart={handleClickStart} />
      )}
    </div>
  );
};

export default StartReset;

const StartButton = ({
  handleClickStart,
}: {
  handleClickStart: () => void;
}) => (
  <IconButton onClick={handleClickStart}>
    <PlayCircleRoundedIcon sx={{ fontSize: 120, color: '#52a2aa' }} />
  </IconButton>
);

const ResetButton = ({
  handleClickReset,
}: {
  handleClickReset: () => void;
}) => (
  <IconButton onClick={handleClickReset}>
    <ClearRoundedIcon sx={{ fontSize: 120, color: '#52a2aa' }} />
  </IconButton>
);
