import {
  CueCardProps,
  JOSHI_PATTERN,
  INITIAL_CUE_CARD_PROPS,
} from '../../../../Model';
import buildHeaderCardProps from './buildHeaderCardProps';
import {
  getJoshi,
  getNounId,
  buildNounCueCardProps,
} from './buildNounCardProps';
import buildVerbCardProps from './buildVerbCardProps';

const buildCueWorkoutCue = ({
  verbId,
  nounIds,
  hasHeader,
  isNegative,
  joshiPattern,
}: {
  verbId: string;
  nounIds: string[];
  hasHeader: boolean;
  isNegative: boolean;
  joshiPattern: string;
}) => {
  const verb = buildVerbCardProps(verbId, isNegative);

  let header: CueCardProps = INITIAL_CUE_CARD_PROPS;
  if (hasHeader) {
    header = buildHeaderCardProps(nounIds[0]);
  }

  let nouns: CueCardProps[] = [];

  switch (nounIds.length) {
    case 1:
      const nounId = nounIds[0];
      const joshi = 'を';
      const nounCueCardProps = buildNounCueCardProps(nounId, joshi);
      nouns = [nounCueCardProps];
      break;
    case 2:
      nouns = nounIds.map((_, index) => {
        const nounId = getNounId(nounIds, joshiPattern, index);
        const joshi = getJoshi(joshiPattern, index);
        return buildNounCueCardProps(nounId, joshi);
      });
      break;
    default:
      console.error(`incorrect nounIds.length: ${nounIds.length}`);
  }

  const text =
    header.label + nouns.map((noun) => noun.label).join('') + verb.label;

  return { text, verb, nouns, header };
};

export default buildCueWorkoutCue;
