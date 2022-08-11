import { useTheme } from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../../../../services/context';

const Points = () => {
  const theme = useTheme();
  const { state } = useContext(AppContext);
  const { cueWorkout } = state;
  const { params } = cueWorkout;
  const { points } = params;
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
