import React from 'react';

import TimeDisplay from './TimeDisplay';
import { useTimes } from '../../services/useTimes';

const ReadTimePractice = () => {
  const { hours, minutes } = useTimes();

  return (
    <div>
      <div
        style={{ padding: '20px 0 28px', textAlign: 'center', fontSize: 28 }}
      >
        相手に時間を伝えてください
      </div>
      <TimeDisplay hours={hours} minutes={minutes} />
    </div>
  );
};

export default ReadTimePractice;
