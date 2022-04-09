import React, { useMemo } from 'react';
import Clock from './Clock';

const TimeDisplay = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => {
  const time = useMemo(
    () => new Date(`2022/01/01 ${hours}:${minutes}:00`),
    [hours, minutes]
  );

  const isDark = useMemo(() => {
    const hours = time.getHours();
    return hours < 5 || hours > 19;
  }, [time]);

  const isDawn = useMemo(() => {
    const hours = time.getHours();
    return hours > 16 && hours <= 19;
  }, [time]);
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '80px 0',
        background: `linear-gradient(to bottom, ${
          isDark
            ? '#2c3e50, #bdc3c7'
            : isDawn
            ? '#ff9068, #fd746c'
            : '#00d2ff,#E0EAFC'
        })`,
      }}
    >
      <Clock time={time} />
    </div>
  );
};

export default TimeDisplay;
