import React, { useMemo } from 'react';
import { css } from '@emotion/css';
import { FlipCard } from '@chihatw/flip-card.flip-card';
import { CardBehind } from '@chihatw/flip-card.card-behind';

import CardFace from '../../CardFace';

const GORLDEN_RATIO = 1.618;

const DoubleCard = ({
  width,
  isYes,
  openedAt,
  closedAt,
  stripeColor,
  handleClick,
}: {
  width: number;
  isYes: boolean;
  openedAt: number;
  closedAt: number;
  stripeColor: string;
  handleClick: () => void;
}) => {
  const height = useMemo(() => width * GORLDEN_RATIO, [width]);
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
      })}
      onClick={handleClick}
    >
      <FlipCard
        disabled
        width={width}
        height={height}
        frontSide={<CardFace isYes={isYes} width={width} height={height} />}
        backSide={
          <CardBehind color={stripeColor} width={width} height={height} />
        }
        superOpenAt={openedAt}
        superCloseAt={closedAt}
        extraRotate={1}
      />
    </div>
  );
};

export default DoubleCard;
