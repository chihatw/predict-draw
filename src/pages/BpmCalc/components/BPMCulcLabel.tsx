import { useTheme } from '@mui/material';
import React from 'react';

const BPMCulcLabel = ({
  label,
  syllableCount,
}: {
  label: string;
  syllableCount: number;
}) => {
  const theme = useTheme();
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          fontSize: 24,
        }}
      >
        <span>{label}</span>
        <span style={{ fontSize: 16, paddingLeft: 8 }}>
          {' '}
          {`(${syllableCount} beats)`}
        </span>
      </div>
    </div>
  );
};

export default BPMCulcLabel;
