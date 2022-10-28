import { NEGATIVE_SENTENCE } from '../../../Model';
import { getRandomInt } from '../../utils';

const getIsNegative = (negativeSentence: string) => {
  switch (negativeSentence) {
    case NEGATIVE_SENTENCE.always:
      return true;
    case NEGATIVE_SENTENCE.random:
      return !!getRandomInt(2);
    default:
      return false;
  }
};

export default getIsNegative;
