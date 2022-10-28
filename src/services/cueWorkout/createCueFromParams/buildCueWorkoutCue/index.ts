import * as R from 'ramda';
import { CueCardProps } from '../../../../Model';
import buildNounCardProps from './buildNounCardProps';
import buildVerbCardProps from './buildVerbCardProps';

const buildCueWorkoutCue = ({
  verbId,
  nounIds,
  hasTopic,
  isInverse,
  isNegative,
}: {
  verbId: string;
  nounIds: string[];
  hasTopic: boolean;
  isInverse: boolean;
  isNegative: boolean;
}) => {
  const verb = buildVerbCardProps(verbId, isNegative);

  if (isInverse) {
    nounIds = R.reverse(nounIds);
  }

  const nouns: CueCardProps[] = nounIds.map((nounId, index) =>
    buildNounCardProps(nounId, index, isInverse, hasTopic, nounIds.length === 2)
  );

  const text = nouns.map((noun) => noun.label).join('') + verb.label;
  return { text, verb, nouns };
};

export default buildCueWorkoutCue;
