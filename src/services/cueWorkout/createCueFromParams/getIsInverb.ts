import { JOSHI_ORDER } from '../../../Model';
import { getRandomInt } from '../../utils';

const getIsInverb = (verb: string, joshiOrder: string) => {
  switch (verb) {
    // 複数目的語の動詞の場合（単独目的語は無関係）
    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      switch (joshiOrder) {
        case JOSHI_ORDER.random:
          return !!getRandomInt(2);
        case JOSHI_ORDER.inverse:
          return true;
        default:
      }
    default:
      return false;
  }
};

export default getIsInverb;
