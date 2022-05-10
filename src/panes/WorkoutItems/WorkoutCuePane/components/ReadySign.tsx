import { useTheme } from '@mui/system';
import React, { useContext } from 'react';
import AppContext from '../../../../services/context';

const ReadySign = () => {
  const theme = useTheme();
  const { workoutTime, checkedIndexes } = useContext(AppContext);
  const { isRunning } = workoutTime;
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
