import React from 'react';
import { useTimes } from '../services/useTimes';
import TimeDisplay from './TimeDisplay';

const ReadTimePerformance = () => {
  const { time, score } = useTimes();

  return (
    <div>
      <div
        style={{ padding: '20px 0 28px', textAlign: 'center', fontSize: 28 }}
      >
        相手に時間を伝えてください
      </div>
      <TimeDisplay time={time} />
      <div
        style={{
          paddingTop: 20,
          textAlign: 'center',
          fontSize: 120,
          color: '#555',
          fontWeight: 'bolder',
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default ReadTimePerformance;
