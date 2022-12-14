import * as R from 'ramda';
import { CueCardProps } from '../../../../Model';
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
  isPoliteType,
  isGroupingWithHa,
  firstNounAlwaysHasHa,
}: {
  verbId: string;
  nounIds: string[];
  hasHeader: boolean;
  isInverse: boolean;
  isNegative: boolean;
  isPoliteType: boolean;
  isGroupingWithHa: boolean;
  firstNounAlwaysHasHa: boolean;
}) => {
  const verb = buildVerbCardProps(verbId, isNegative, isPoliteType);

  if (isInverse) {
    nounIds = R.reverse(nounIds);
  }

  let topicNounId = '';
  if (hasHeader) {
    topicNounId = nounIds[getRandomInt(2)];
  }
  const header = buildHeaderCardProps(topicNounId);

  const nouns: CueCardProps[] = nounIds.map((nounId, index) =>
    buildNounCardProps(
      nounId,
      index,
      isInverse,
      firstNounAlwaysHasHa,
      nounIds.length === 2,
      topicNounId,
      isGroupingWithHa
    )
  );

  const text =
    header.label + nouns.map((noun) => noun.label).join('') + verb.label;

  return { text, verb, nouns, header };
};

export default buildCueWorkoutCue;
