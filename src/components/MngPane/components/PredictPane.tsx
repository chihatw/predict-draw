import { useContext } from 'react';

import usePredict from '../../../services/usePredict';

const PredictPane = () => {
  const { predict } = usePredict();
  return (
    <div>{`予想: ${
      !predict ? '未選択' : predict === 'yes' ? 'はい' : 'いいえ'
    }`}</div>
  );
};

export default PredictPane;
