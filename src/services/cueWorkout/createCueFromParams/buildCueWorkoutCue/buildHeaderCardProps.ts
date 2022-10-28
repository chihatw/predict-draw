import { INITIAL_CUE_CARD_PROPS } from '../../../../Model';
import { CUE_CARDS } from '../../../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';
import { getRandomInt } from '../../../utils';

const buildHeaderCardProps = (hasHeader: boolean, nounIds: string[]) => {
  if (!hasHeader) return INITIAL_CUE_CARD_PROPS;

  const targetNounId = nounIds[getRandomInt(2)];

  const noun = CUE_CARDS[targetNounId];

  let label = `私は${noun.label}が好きです`;
  let pitchStr = ['わたしは', `${noun.pitchStr}が`, 'すき＼です'].join(' ');
  return { label, pitchStr };
};
export default buildHeaderCardProps;
