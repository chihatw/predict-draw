import { useTheme } from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';

function BpmPane({ elapsedTime }: { elapsedTime: number }) {
  const theme = useTheme();
  const { bpm } = useSelector((state: RootState) => state.speedWorkoutParams);

  return (
    <div
      style={{
        ...(theme.typography as any).lato900,
        fontSize: 60,
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          ...(theme.typography as any).lato100,
          fontSize: 36,
          paddingRight: 20,
          paddingBottom: 6,
        }}
      >
        BPM
      </div>
      <div>{bpm > 0 ? bpm : '--'}</div>
    </div>
  );
}

export default BpmPane;
