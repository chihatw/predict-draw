import { JOSHI_PATTERN } from '../../../../Model';
import { CUE_CARDS } from '../../../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';

export const buildNounCueCardProps = (nounId: string, joshi: string) => {
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;

  // 助詞が「には」で、名詞にアクセントがない場合は、「に＼は」になる
  if (
    joshi === 'には' &&
    !noun.pitchStr.includes('＼') &&
    !noun.hasTailAccent
  ) {
    joshi = 'に＼は';
  }

  const pitchStr = noun.pitchStr + (noun.hasTailAccent ? '＼' : '') + joshi;
  return { label, pitchStr };
};

export const getNounId = (
  nounIds: string[],
  joshiPattern: string,
  index: number
) => {
  switch (index) {
    case 0:
      switch (joshiPattern) {
        case JOSHI_PATTERN.default:
        case JOSHI_PATTERN.topic_wo_head:
        case JOSHI_PATTERN.topic_ni_head:
        case JOSHI_PATTERN.group_wo_tail:
        case JOSHI_PATTERN.group_ni_tail:
          return nounIds[0];
        case JOSHI_PATTERN.inverse:
        case JOSHI_PATTERN.topic_wo_tail:
        case JOSHI_PATTERN.topic_ni_tail:
        case JOSHI_PATTERN.group_wo_head:
        case JOSHI_PATTERN.group_ni_head:
          return nounIds[1];
        default:
          console.log(`incorrect joshiPattern: ${joshiPattern}`);
          return '';
      }
    case 1:
      switch (joshiPattern) {
        case JOSHI_PATTERN.default:
        case JOSHI_PATTERN.topic_wo_head:
        case JOSHI_PATTERN.topic_ni_head:
        case JOSHI_PATTERN.group_wo_tail:
        case JOSHI_PATTERN.group_ni_tail:
          return nounIds[1];
        case JOSHI_PATTERN.inverse:
        case JOSHI_PATTERN.topic_wo_tail:
        case JOSHI_PATTERN.topic_ni_tail:
        case JOSHI_PATTERN.group_wo_head:
        case JOSHI_PATTERN.group_ni_head:
          return nounIds[0];
        default:
          console.log(`incorrect joshiPattern: ${joshiPattern}`);
          return '';
      }
    default:
      console.error(`incorrect index: ${index}`);
      return '';
  }
};

export const getJoshi = (joshiPattern: string, index: number) => {
  if (![0, 1].includes(index)) {
    console.error(`incorrect index: ${index}`);
    return '';
  }
  switch (joshiPattern) {
    case JOSHI_PATTERN.default:
      return ['を', 'に'][index];
    case JOSHI_PATTERN.inverse:
      return ['に', 'を'][index];
    case JOSHI_PATTERN.topic_wo_head:
    case JOSHI_PATTERN.group_wo_head:
      return ['は', 'に'][index];
    case JOSHI_PATTERN.topic_wo_tail:
    case JOSHI_PATTERN.group_wo_tail:
      return ['に', 'は'][index];
    case JOSHI_PATTERN.topic_ni_head:
    case JOSHI_PATTERN.group_ni_head:
      return ['には', 'を'][index];
    case JOSHI_PATTERN.topic_ni_tail:
    case JOSHI_PATTERN.group_ni_tail:
      return ['を', 'には'][index];

    default:
      console.log(`incorrect joshiPattern: ${joshiPattern}`);
      return '';
  }
};
