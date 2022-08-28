import { useTheme } from '@mui/system';
import React, { useContext } from 'react';
import { AppContext } from '../../../../../App';

const ReadySign = () => {
  const theme = useTheme();
  const { state } = useContext(AppContext);
  const { workoutParams } = state;
  const { isRunning, checkedIndexes } = workoutParams;

  if (!isRunning && !checkedIndexes.length) {
    return (
      <div
        style={{
          ...(theme.typography as any).lato900,
          textAlign: 'center',
          color: '#ccc',
          fontSize: 88,
          paddingTop: 120,
        }}
      >
        Ready!!
      </div>
    );
  }
  return <></>;
};

export default ReadySign;
