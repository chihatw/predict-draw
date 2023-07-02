import { useTheme } from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';

const Points = () => {
  const theme = useTheme();
  const { points } = useSelector((state: RootState) => state.cueWorkoutParams);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div>
          <span
            style={{
              ...(theme.typography as any).lato900,
              fontSize: 100,
            }}
          >
            {points}
          </span>
          <span
            style={{
              ...(theme.typography as any).mRounded300,
              fontSize: 24,
            }}
          >
            Points
          </span>
        </div>
      </div>
    </div>
  );
};

export default Points;
