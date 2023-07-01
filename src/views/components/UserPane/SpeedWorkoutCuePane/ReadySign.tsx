import { useTheme } from '@mui/system';
import React from 'react';

const ReadySign = () => {
  const theme = useTheme();
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
};

export default ReadySign;
