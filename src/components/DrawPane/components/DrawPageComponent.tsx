import React from 'react';
import { Container } from '@mui/material';
import { CustomLabel } from '@chihatw/lang-gym-h.ui.custom-label';

import RatioPane from './RatioPane';
import SingleCard from './SingleCard';

const DrawPageComponent = ({
  drawn,
  yesRatio,
  closedAt,
  openedAt,
  isManagementMode,
  handleClick,
  width,
  stripeColor,
}: {
  drawn: string;
  yesRatio: number;
  closedAt: number;
  openedAt: number;
  isManagementMode: boolean;
  handleClick: () => void;
  width: number;
  stripeColor: string;
}) => {
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <CustomLabel label={`地震発生時間`} />
        <div style={{ padding: '16px 8px' }}>
          <RatioPane progress={yesRatio} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: isManagementMode ? 'none' : 'auto',
            }}
          >
            <SingleCard
              width={width}
              isYes={drawn === 'yes'}
              closedAt={closedAt}
              opendeAt={openedAt}
              stripeColor={stripeColor}
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DrawPageComponent;
