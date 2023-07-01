import { useTheme } from '@mui/material';
import { calcBpm } from 'application/speedWorkoutParams/core/2-services';
import { RootState } from 'main';
import { useSelector } from 'react-redux';

function BpmPane({ elapsedTime }: { elapsedTime: number }) {
  const theme = useTheme();
  const { selectedId, isRunning } = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );

  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId]
  );

  let bpm = 0;
  if (
    !isRunning &&
    !!elapsedTime &&
    !!speedWorkout &&
    !!speedWorkout.beatCount
  ) {
    bpm = calcBpm({
      miliSeconds: elapsedTime,
      beatCount: speedWorkout.beatCount,
    });
  }
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
