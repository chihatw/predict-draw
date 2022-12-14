import { NEVER_ALWAYS_RANDOM } from '../../../Model';
import { getRandomInt } from '../../utils';

const getIsTopicFirst = (topicFirst: string) => {
  switch (topicFirst) {
    case NEVER_ALWAYS_RANDOM.always:
      return true;
    case NEVER_ALWAYS_RANDOM.random:
      return !!getRandomInt(2); // 50%
    default:
      return false;
  }
};

export default getIsTopicFirst;
