import { TOPIC_MODE } from '../../../Model';
import { getRandomInt } from '../../utils';

const getHasTopic = (topicMode: string) => {
  switch (topicMode) {
    case TOPIC_MODE.hasTopic:
      return true;
    case TOPIC_MODE.random:
      // ランダムの時は、50% で true
      return !!getRandomInt(2);
    default:
      return false;
  }
};

export default getHasTopic;
