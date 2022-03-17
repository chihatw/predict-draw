import { IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { PlayArrowRounded, Stop } from '@mui/icons-material';

import AppContext from '../../../services/context';

const StartButton = () => {
  const { updateBpmTrackStartAt, updateBpmTrackStopAt } =
    useContext(AppContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = () => {
    if (isPlaying) {
      updateBpmTrackStopAt(Date.now());
    } else {
      updateBpmTrackStartAt(Date.now());
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div>
      <IconButton onClick={handleClick} color='primary'>
        {isPlaying ? (
          <Stop style={{ fontSize: 40 }} />
        ) : (
          <PlayArrowRounded style={{ fontSize: 40 }} />
        )}
      </IconButton>
    </div>
  );
};

export default StartButton;
