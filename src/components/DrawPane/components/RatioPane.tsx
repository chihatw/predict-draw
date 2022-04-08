import React from 'react';

const RatioPane = ({ progress }: { progress: number }) => {
  // 2000-01-01 20:00:00 は iOS でエラー
  const start = new Date('2000/01/01 20:00:00');
  const date = new Date(start.getTime() + 10 * 60 * 60 * 8 * progress);

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 32, paddingRight: 4 }}>{date.getHours()}</span>
      <span>時</span>
      <span style={{ fontSize: 32, paddingRight: 4 }}>
        {String(date.getMinutes()).padStart(2, '0')}
      </span>
      <span>分</span>
    </div>
  );
};

export default RatioPane;
