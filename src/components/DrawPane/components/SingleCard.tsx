import React, { useMemo } from 'react';

import { CardBehind } from '@chihatw/flip-card.card-behind';
import { FlipCard } from '@chihatw/flip-card.flip-card';
import CardFace from '../../CardFace';

const Golden_Ratio = 1.618;

const SingleCard = ({
  width,
  isYes,
  closedAt,
  opendeAt,
  stripeColor,
  handleClick,
}: {
  width: number;
  isYes: boolean;
  closedAt: number;
  opendeAt: number;
  stripeColor: string;
  handleClick: () => void;
}) => {
  const height = useMemo(() => width * Golden_Ratio, [width]);
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center' }}
      onClick={handleClick}
    >
      <FlipCard
        width={width}
        height={width * Golden_Ratio}
        backSide={
          <CardFace width={width} height={height} isYes={isYes || false} />
        }
        frontSide={
          <CardBehind color={stripeColor} width={width} height={height} />
        }
        superCloseAt={closedAt}
        superOpenAt={opendeAt}
        extraRotate={1}
      />
    </div>
  );
};

export default SingleCard;
