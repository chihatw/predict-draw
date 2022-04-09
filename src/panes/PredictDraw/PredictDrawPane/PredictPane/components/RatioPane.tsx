import React from 'react';
import { CustomLabel } from '@chihatw/lang-gym-h.ui.custom-label';

const RatioPane: React.FC<{
  progress: number;
}> = ({ progress }) => {
  return (
    <div style={{ paddingBottom: 24 }}>
      <CustomLabel label={`地震発生時間`} />
      <div
        style={{
          display: 'grid',
          padding: '16px 8px',
          gridTemplateColumns: '140px 140px',
        }}
      >
        <Ratio progress={progress} />
      </div>
    </div>
  );
};

export default RatioPane;

const Ratio: React.FC<{ progress: number }> = ({ progress }) => {
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
