import React from 'react';
import usePredict from '../../services/usePredict';
import NewGameButton from './components/NewGameButton';
import YesRatioSlider from './components/YesRatioSlider';

const MngPredictDrawPane = () => {
  const {
    drawn,
    predict,
    yesRatio,
    updateYesRatio,
    updatePredict,
    updateNewGameAt,
  } = usePredict();
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <YesRatioSlider
        superYesRatio={yesRatio}
        updateNewGameAt={updateNewGameAt}
        updateYesRatio={updateYesRatio}
      />
      <div>{`予想: ${
        !predict
          ? '未選択'
          : predict === 'yes'
          ? '寝ていました'
          : '携帯を触っていました'
      }`}</div>
      <div>{`結果: ${
        !drawn
          ? '未選択'
          : drawn === 'yes'
          ? '寝ていました'
          : '携帯を触っていました'
      }`}</div>
      <NewGameButton
        updatePredict={updatePredict}
        updateNewGameAt={updateNewGameAt}
      />
    </div>
  );
};

export default MngPredictDrawPane;
