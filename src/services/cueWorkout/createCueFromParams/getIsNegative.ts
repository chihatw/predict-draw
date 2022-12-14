import { NEVER_ALWAYS_RANDOM } from '../../../Model';
import { getRandomInt } from '../../utils';

const getIsNegative = (negativeSentence: string) => {
  switch (negativeSentence) {
    case NEVER_ALWAYS_RANDOM.always:
      return true;
    case NEVER_ALWAYS_RANDOM.random:
      return !!getRandomInt(3); // 66.7%
    default:
      return false;
  }
};

export default getIsNegative;
