import { CUE_CARDS } from '../../../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';

const buildNounCardProps = ({
  nounId,
  index,
  isInverse,
  hasDouble,
  topicNounId,
  isTopicFirst,
  isGroupingWithHa,
  firstNounAlwaysHasHa,
}: {
  nounId: string;
  index: number;
  isInverse: boolean;
  hasDouble: boolean;
  topicNounId: string;
  isTopicFirst: boolean;
  isGroupingWithHa: boolean;
  firstNounAlwaysHasHa: boolean;
}) => {
  // 分類の「は」を使う設定で、nounId が既出ではない場合
  const hasGrouping = isGroupingWithHa && nounId !== topicNounId;

  const joshi = buildJoshi(index, firstNounAlwaysHasHa, isInverse, hasGrouping);
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;
  let pitchStr = noun.pitchStr + (noun.hasTailAccent ? '＼' : '') + joshi;
  const tail = pitchStr.slice(-2);
  if (tail === 'には' && !pitchStr.includes('＼')) {
    pitchStr = pitchStr.slice(0, -2) + 'に＼は';
  }

  const hasBorder = hasDouble && index === 0;

  return { label, pitchStr, hasBorder };
};

export default buildNounCardProps;

/**
 * パラメータ firstNounAlwaysHasHa, isInverse を受け取って助詞を返す
 */
const buildJoshi = (
  index: number,
  firstNounAlwaysHasHa: boolean,
  isInverse: boolean,
  hasGrouping: boolean
) => {
  let result = '';
  /** 1つ目 */
  if (index === 0) {
    // トピックがあれば「は」
    if (firstNounAlwaysHasHa) return 'は';
    result = isInverse ? 'に' : 'を';
  } else {
    /** 2つ目 */
    result = isInverse ? 'を' : 'に';
  }
  return groupingFilter(result, hasGrouping);
};

const groupingFilter = (joshi: string, hasGrouping: boolean) => {
  if (!hasGrouping) return joshi;
  switch (joshi) {
    case 'を':
      return 'は';
    default:
      return joshi + 'は';
  }
};
