import { useTheme } from '@mui/material';
import React from 'react';

const BPMPane = ({ bpm }: { bpm: number }) => {
  const theme = useTheme();
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
};

export default BPMPane;
