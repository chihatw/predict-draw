import { NEVER_ALWAYS_RANDOM } from '../../../Model';
import { getRandomInt } from '../../utils';

const getIsGroupingWithHa = (groupingWithHa: string) => {
  switch (groupingWithHa) {
    case NEVER_ALWAYS_RANDOM.always:
      return true;
    case NEVER_ALWAYS_RANDOM.random:
      return !!getRandomInt(3); // 0, 1, 2; 66.7% が true
    default:
      return false;
  }
};

export default getIsGroupingWithHa;
