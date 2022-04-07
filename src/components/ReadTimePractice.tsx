import React from 'react';
import { useTimes } from '../services/useTimes';
import TimeDisplay from './TimeDisplay';

const ReadTimePractice = () => {
  const { time } = useTimes();
  return (
    <div>
      <div
        style={{ padding: '20px 0 28px', textAlign: 'center', fontSize: 28 }}
      >
        相手に時間を伝えてください
      </div>
      <TimeDisplay time={time} />
    </div>
  );
};

export default ReadTimePractice;
