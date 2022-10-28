import { CUE_CARDS } from '../../../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';

const buildNounCardProps = (
  nounId: string,
  index: number,
  isInverse: boolean,
  hasTopic: boolean,
  hasDouble: boolean
) => {
  const joshi = buildJoshi(index, hasTopic, isInverse);
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;
  const pitchStr = noun.pitchStr + (noun.hasTailAccent ? '＼' : '') + joshi;
  const hasBorder = hasDouble && index === 0;

  return { label, pitchStr, hasBorder };
};

export default buildNounCardProps;

const buildJoshi = (index: number, hasTopic: boolean, isInverse: boolean) => {
  /** 1つ目 */
  if (index === 0) {
    // トピックがあれば「は」
    if (hasTopic) return 'は';
    return isInverse ? 'に' : 'を';
  }
  /** 2つ目 */
  return isInverse ? 'を' : 'に';
};
