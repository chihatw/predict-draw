import React from 'react';

const TimerDisplay = ({ time }: { time: number }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      fontSize: 98,
      fontWeight: 'bolder',
      color: '#555',
    }}
  >
    <div style={{ display: 'grid', gridTemplateColumns: '150px 12px 150px' }}>
      <div style={{ textAlign: 'right' }}>{Math.floor(time / 1000)}</div>
      <div
        style={{
          fontSize: 60,
          display: 'flex',
          textAlign: 'center',
          alignItems: 'flex-end',
          marginBottom: 8,
        }}
      >
        .
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          alignItems: 'flex-end',
          marginBottom: 8,
        }}
      >
        {Math.floor((time % 1000) / 100)}
      </div>
    </div>
  </div>
);

export default TimerDisplay;
