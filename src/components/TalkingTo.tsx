import React, { useMemo } from 'react';

const TalkingTo = ({ name }: { name: string }) => {
  const color = useMemo(
    () => (name === '李桑' ? '#c62828' : '#1565c0'),
    [name]
  );
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color,
          fontSize: 100,
          fontWeight: 'bold',
          lineHeight: '100px',
        }}
      >
        <div>我現在</div>
        <div>{`跟${name}`}</div>
        <div>講話</div>
      </div>
    </div>
  );
};

export default TalkingTo;
