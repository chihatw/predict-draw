import * as R from 'ramda';
import { CueCardProps, INITIAL_CUE_CARD_PROPS } from '../../../../Model';
import buildHeaderCardProps from './buildHeaderCardProps';
import buildNounCardProps from './buildNounCardProps';
import buildVerbCardProps from './buildVerbCardProps';

const buildCueWorkoutCue = ({
  verbId,
  nounIds,
  hasTopic,
  hasHeader,
  isInverse,
  isNegative,
  isPoliteType,
}: {
  verbId: string;
  nounIds: string[];
  hasTopic: boolean;
  hasHeader: boolean;
  isInverse: boolean;
  isNegative: boolean;
  isPoliteType: boolean;
}) => {
  const verb = buildVerbCardProps(verbId, isNegative, isPoliteType);

  if (isInverse) {
    nounIds = R.reverse(nounIds);
  }

  const nouns: CueCardProps[] = nounIds.map((nounId, index) =>
    buildNounCardProps(nounId, index, isInverse, hasTopic, nounIds.length === 2)
  );
  const header = buildHeaderCardProps(hasHeader, nounIds);

  const text =
    header.label + nouns.map((noun) => noun.label).join('') + verb.label;

  return { text, verb, nouns, header };
};

export default buildCueWorkoutCue;
