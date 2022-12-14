import { INITIAL_CUE_CARD_PROPS } from '../../../../Model';
import { CUE_CARDS } from '../../../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';

/**
 * 選ばれた nounId から label と pitchStr を作る
 * nounId がなければ、初期値を返す
 */
const buildHeaderCardProps = (topicNounId: string) => {
  if (!topicNounId) return INITIAL_CUE_CARD_PROPS;

  const noun = CUE_CARDS[topicNounId];

  const label = `私は${noun.label}が好きです`;
  const pitchStr = ['わたしは', `${noun.pitchStr}が`, 'すき＼です'].join(' ');
  return { label, pitchStr };
};
export default buildHeaderCardProps;
