import { useContext } from 'react';

import AppContext from '../../../services/context';

const PredictPane = () => {
  const { predict } = useContext(AppContext);
  return (
    <div>{`予想: ${
      !predict ? '未選択' : predict === 'yes' ? 'はい' : 'いいえ'
    }`}</div>
  );
};

export default PredictPane;
