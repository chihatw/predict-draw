import React from 'react';
import { CustomLabel } from '@chihatw/lang-gym-h.ui.custom-label';
import { Collapse, Switch } from '@mui/material';

import Smoke from './Smoke';

const RatioPane: React.FC<{
  progress: number;
  showRatioPane: boolean;
  isManagementMode: boolean;
  superShowRatioPane: boolean;
  handleShowRatio: (value: boolean) => void;
}> = ({
  progress,
  showRatioPane,
  isManagementMode,
  superShowRatioPane,
  handleShowRatio,
}) => {
  if (isManagementMode) {
    return (
      <div>
        <div>
          <Switch
            size='small'
            checked={showRatioPane}
            onChange={(e) => {
              handleShowRatio(e.target.checked);
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Context progress={progress} />
          {!superShowRatioPane && <Smoke />}
        </div>
      </div>
    );
  } else {
    return (
      <Collapse in={!!superShowRatioPane}>
        <Context progress={progress} />
      </Collapse>
    );
  }
};

export default RatioPane;

const Context: React.FC<{
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
