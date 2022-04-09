import { css } from '@emotion/css';
import { Container } from '@mui/material';
import React from 'react';

import RatioPane from './components/RatioPane';
import PredictRow from './components/PredictRow';
import usePredict from '../../../../services/usePredict';

const CARD_WIDTH = 160;

export const PredictPane = ({
  opponent,
  isManagementMode,
}: {
  opponent: string;
  isManagementMode?: boolean;
}) => {
  const {
    newGameAt,
    predict: superPredict,
    yesRatio,
    updatePredict: superHandlePredict,
  } = usePredict();

  const handlePredict = (value: string) => {
    !!superHandlePredict && superHandlePredict(value);
  };

  return (
    <Container maxWidth='sm'>
      <div className={css({ display: 'grid' })}>
        <RatioPane progress={yesRatio} />
        <PredictRow
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
};
