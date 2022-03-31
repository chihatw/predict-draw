import React from 'react';
import { Card } from '@chihatw/lang-gym-h.card.ui.card';
import { FlipCard } from '@chihatw/lang-gym-h.card.ui.flip-card';

import { CardBehind } from '@chihatw/lang-gym-h.card.ui.card-behind';

const SingleCard = ({
  width,
  isYes,
  closedAt,
  opendeAt,
  stripeColor,
  yesImage,
  noImage,
  handleClick,
}: {
  width: number;
  isYes: boolean;
  closedAt: number;
  opendeAt: number;
  noImage: any;
  yesImage: any;
  stripeColor: string;
  handleClick: () => void;
}) => (
  <div
    style={{ display: 'flex', justifyContent: 'center' }}
    onClick={handleClick}
  >
    <FlipCard
      width={width}
      backSide={
        <Card
          isYes={isYes}
          width={width}
          yesImage={yesImage}
          noImage={noImage}
        />
      }
      frontSide={<CardBehind color={stripeColor} width={width} />}
      superClose={closedAt}
      superOpen={opendeAt}
      rotateTimes={1}
    />
  </div>
);

export default SingleCard;
