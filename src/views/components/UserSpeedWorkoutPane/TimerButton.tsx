import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';

const TimerButton = ({ handleClick }: { handleClick: () => void }) => {
  const { isRunning } = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );
  return (
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
};

export default TimerButton;
