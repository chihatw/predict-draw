import { css } from '@emotion/css';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import RatioPane from './components/RatioPane';
import PredictPane from './components/PredictPane';

const CARD_WIDTH = 160;

export type PredictProps = {
  yesRatio: number;
  opponent: string;
  newGameAt: number;
  superPredict?: string;
  isManagementMode?: boolean;
  superHandlePredict?: (value: string) => void;
};

export function Predict({
  opponent,
  yesRatio,
  newGameAt,
  superPredict,
  isManagementMode,
  superHandlePredict,
}: PredictProps) {
  const handlePredict = (value: string) => {
    !!superHandlePredict && superHandlePredict(value);
  };

  return (
    <Container maxWidth='sm'>
      <div className={css({ display: 'grid' })}>
        <RatioPane progress={yesRatio} />
        <PredictPane
          opponent={opponent}
          newGameAt={newGameAt}
          cardWidth={CARD_WIDTH}
          superPredict={superPredict}
          isManagementMode={isManagementMode || false}
          handlePredict={handlePredict}
        />
      </div>
    </Container>
  );
}
