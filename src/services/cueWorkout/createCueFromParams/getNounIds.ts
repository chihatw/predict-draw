import { shuffle } from '../../utils';

const getNounIds = (verbId: string, nouns: string[]) => {
  let nounIds: string[] = [];
  switch (verbId) {
    case 'motsu':
    case 'yubisasu':
    case 'hikkurikaesu':
      nounIds.push(shuffle(nouns)[0]);
      break;
    case 'ireru':
    case 'noseru':
    case 'kabuseru':
      const shuffledColors = shuffle(nouns);
      nounIds = shuffledColors.slice(0, 2);
      break;
    default:
  }
  return nounIds;
};

export default getNounIds;
