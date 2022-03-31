import React from 'react';
import { css } from '@emotion/css';
import { Card } from '@chihatw/lang-gym-h.card.ui.card';
import { FlipCard } from '@chihatw/lang-gym-h.card.ui.flip-card';
import { CardBehind } from '@chihatw/lang-gym-h.card.ui.card-behind';

const DoubleCard = ({
  width,
  isYes,
  openedAt,
  closedAt,
  stripeColor,
  handleClick,
  yesImage,
  noImage,
}: {
  width: number;
  isYes: boolean;
  noImage: any;
  openedAt: number;
  yesImage: any;
  closedAt: number;
  stripeColor: string;
  handleClick: () => void;
}) => {
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
        frontSide={
          <Card
            isYes={isYes}
            width={width}
            yesImage={yesImage}
            noImage={noImage}
          />
        }
        backSide={<CardBehind color={stripeColor} width={width} />}
        superOpen={openedAt}
        superClose={closedAt}
        rotateTimes={1}
      />
    </div>
  );
};

export default DoubleCard;
