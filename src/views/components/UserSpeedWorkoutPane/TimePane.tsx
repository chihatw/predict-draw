import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';

const TimePane = ({ miliSeconds }: { miliSeconds: number }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <StopWatch miliSeconds={miliSeconds} width={200} />
  </div>
);

export default TimePane;

const StopWatch = ({
  max,
  width,
  miliSeconds,
}: {
  max?: number;
  width?: number;
  miliSeconds: number;
}) => {
  const _max = Math.min(99999, max || 99999);
  const theme = useTheme();
  const seconds = useMemo(() => {
    return String(Math.floor(miliSeconds / 1000));
  }, [miliSeconds]);

  const underDecimalPoint = useMemo(() => {
    const underDecimalPoint = Math.floor((miliSeconds % 1000) / 100);
    return String(underDecimalPoint);
  }, [miliSeconds]);

  return (
    <div
      style={{
        ...(theme.typography as any).lato900,
        width,
        height: (width || 120) * 0.6,
        display: 'flex',
        fontSize: (width || 120) * 0.5,
        justifyContent: 'center',
      }}
    >
      {miliSeconds > _max ? (
        <div style={{ flexGrow: 1, textAlign: 'center' }}>--</div>
      ) : (
        <>
          <div style={{ textAlign: 'end' }}>{seconds}</div>
          <div>.</div>
          <div>{underDecimalPoint}</div>
        </>
      )}
    </div>
  );
};
