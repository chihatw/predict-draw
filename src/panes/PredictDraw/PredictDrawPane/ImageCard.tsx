import React from 'react';
import noImage from './images/keitai.png';
import yesImage from './images/suimin.png';

const ImageCard = ({ isYes, width }: { isYes: boolean; width: number }) => {
  return (
    <div style={{ userSelect: 'none' }}>
      <img src={isYes ? yesImage : noImage} width={width} />
    </div>
  );
};

export default ImageCard;
