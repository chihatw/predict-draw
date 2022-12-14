import * as R from 'ramda';
import { CueCardProps, INITIAL_CUE_CARD_PROPS } from '../../../../Model';
import { getRandomInt } from '../../../utils';
import buildHeaderCardProps from './buildHeaderCardProps';
import buildNounCardProps from './buildNounCardProps';
import buildVerbCardProps from './buildVerbCardProps';

const buildCueWorkoutCue = ({
  verbId,
  nounIds,
  hasHeader,
  isInverse,
  isNegative,
  isTopicFirst,
  isPoliteType,
  isGroupingWithHa,
  firstNounAlwaysHasHa,
}: {
  verbId: string;
  nounIds: string[];
  hasHeader: boolean;
  isInverse: boolean;
  isTopicFirst: boolean;
  isNegative: boolean;
  isPoliteType: boolean;
  isGroupingWithHa: boolean;
  firstNounAlwaysHasHa: boolean;
}) => {
  const verb = buildVerbCardProps(verbId, isNegative, isPoliteType);

  if (isInverse) {
    nounIds = R.reverse(nounIds);
  }

  // 前置きがない場合も、内部的に設定する
  const topicNounId = nounIds[getRandomInt(2)];
  const other = nounIds.find((item) => item !== topicNounId);
  if (other) {
    nounIds = isTopicFirst ? [topicNounId, other] : [other, topicNounId];
  }

  let header: CueCardProps = INITIAL_CUE_CARD_PROPS;
  if (hasHeader) {
    header = buildHeaderCardProps(topicNounId);
  }

  const nouns: CueCardProps[] = nounIds.map((nounId, index) =>
    buildNounCardProps({
      index,
      nounId,
      isInverse,
      hasDouble: nounIds.length === 2,
      topicNounId,
      isTopicFirst,
      isGroupingWithHa,
      firstNounAlwaysHasHa,
    })
  );

  const text =
    header.label + nouns.map((noun) => noun.label).join('') + verb.label;

  return { text, verb, nouns, header };
};

export default buildCueWorkoutCue;
