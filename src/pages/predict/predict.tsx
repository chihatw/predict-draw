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
  superShowRatioPane: boolean;
  superShowPredictPane: boolean;
  superHandlePredict?: (value: string) => void;
  superHandleShowRatioPane?: (value: boolean) => void;
  superHandleShowPredictPane?: (value: boolean) => void;
};

export function Predict({
  opponent,
  yesRatio,
  newGameAt,
  superPredict,
  isManagementMode,
  superShowRatioPane,
  superShowPredictPane,
  superHandlePredict,
  superHandleShowRatioPane,
  superHandleShowPredictPane,
}: PredictProps) {
  const [showRatioPane, setShowRatioPane] = useState(superShowRatioPane);
  const [showPredictPane, setShowPredictPane] = useState(superShowPredictPane);

  useEffect(() => {
    setShowRatioPane(superShowRatioPane);
  }, [superShowRatioPane]);

  useEffect(() => {
    setShowPredictPane(superShowPredictPane);
  }, [superShowPredictPane]);

  const handlePredict = (value: string) => {
    !!superHandlePredict && superHandlePredict(value);
  };

  const handleShowRatio = (checked: boolean) => {
    setShowRatioPane(checked);
    !!superHandleShowRatioPane && superHandleShowRatioPane(checked);
  };

  const handleShowPredict = (checked: boolean) => {
    setShowPredictPane(checked);
    !!superHandleShowPredictPane && superHandleShowPredictPane(checked);
  };

  return (
    <Container maxWidth='sm'>
      <div className={css({ display: 'grid' })}>
        <RatioPane
          progress={yesRatio}
          showRatioPane={showRatioPane}
          isManagementMode={isManagementMode || false}
          superShowRatioPane={superShowRatioPane}
          handleShowRatio={handleShowRatio}
        />
        <PredictPane
          opponent={opponent}
          newGameAt={newGameAt}
          cardWidth={CARD_WIDTH}
          superPredict={superPredict}
          showPredictPane={showPredictPane}
          isManagementMode={isManagementMode || false}
          superShowPredictPane={superShowPredictPane}
          handlePredict={handlePredict}
          handleShowPredict={handleShowPredict}
        />
      </div>
    </Container>
  );
}
