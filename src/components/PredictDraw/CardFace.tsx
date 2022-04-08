import { CardFrame } from '@chihatw/flip-card.card-frame';
import React from 'react';
import ImageCard from './ImageCard';

const CardFace = ({
  width,
  height,
  isYes,
}: {
  width: number;
  height: number;
  isYes: boolean;
}) => {
  return (
    <CardFrame width={width} height={height}>
      <ImageCard isYes={isYes || false} width={width} />
    </CardFrame>
  );
};

export default CardFace;
