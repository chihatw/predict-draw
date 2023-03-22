import { useMemo } from 'react';
import {
  INITIAL_PATTERN,
  KAKU_ORDERS,
  Pattern,
  SENTENCE_TYPES,
  TARGET,
} from '../../../../Model';

export const PATTERNS = [
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れる',
    sentence: '青を赤に入れる',
    grouping: 'none',
    isWoFirst: true,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '青を赤に入れない',
    grouping: 'none',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れる',
    sentence: '赤に青を入れる',
    grouping: 'none',
    isWoFirst: false,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤に青を入れない',
    grouping: 'none',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '青は赤に入れない',
    grouping: 'wo',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤に青は入れない',
    grouping: 'wo',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'none',
    doushi: '入れない',
    sentence: '青を赤には入れない',
    grouping: 'ni',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤には青を入れない',
    grouping: 'ni',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'wo',
    doushi: '入れる',
    sentence: '青は赤に入れる',
    grouping: 'none',
    isWoFirst: true,
    isNegative: false,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は赤に入れない',
    grouping: 'none',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は、',
    ni: 'に',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は、赤に入れない',
    grouping: 'wo',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'には',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は赤には入れない',
    grouping: 'ni',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'ni',
    doushi: '入れる',
    sentence: '青には赤を入れる',
    grouping: 'none',
    isWoFirst: false,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には赤を入れない',
    grouping: 'none',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'には',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には赤は入れない',
    grouping: 'wo',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には、',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には、赤を入れない',
    grouping: 'ni',
    isWoFirst: false,
    isNegative: true,
  },
];

const usePatterns = () => {
  const patterns = useMemo(() => {
    const patterns: Pattern[] = [];
    for (const topicType of Object.keys(TARGET)) {
      for (const groupingType of Object.keys(TARGET)) {
        for (const kakuOrder of Object.keys(KAKU_ORDERS)) {
          for (const sentenceType of Object.keys(SENTENCE_TYPES)) {
            const pattern = { ...INITIAL_PATTERN };

            // トピック
            pattern.topic = topicType;
            switch (pattern.topic) {
              case TARGET.wo:
                pattern.wo = 'は';
                break;
              case TARGET.ni:
                pattern.ni = 'には';
              default:
            }

            // 分類
            pattern.grouping = groupingType;
            switch (pattern.grouping) {
              case TARGET.wo:
                pattern.wo = 'は';
                break;
              case TARGET.ni:
                pattern.ni = 'には';
              default:
            }

            // 格順
            if (kakuOrder === KAKU_ORDERS.niFirst) {
              pattern.isWoFirst = false;
            }

            // 肯否定
            if (sentenceType === SENTENCE_TYPES.negative) {
              pattern.isNegative = true;
              pattern.doushi = '入れない';
            }

            const sentence = buildSentence(pattern);
            pattern.sentence = sentence;

            //　主題が後ろの場合は無視
            if (
              (pattern.topic === TARGET.wo && !pattern.isWoFirst) ||
              (pattern.topic === TARGET.ni && pattern.isWoFirst)
            )
              continue;

            // 肯定文の分類は無視
            if (!pattern.isNegative && pattern.grouping !== TARGET.none)
              continue;

            patterns.push(pattern);
          }
        }
      }
    }
    return patterns;
  }, []);
  return patterns;
};

export default usePatterns;

const buildSentence = (pattern: Pattern) => {
  // 主題と分類が同じ時は間を開ける
  if (pattern.topic === TARGET.wo && pattern.grouping == TARGET.wo) {
    pattern.wo = 'は、';
  }
  if (pattern.topic === TARGET.ni && pattern.grouping === TARGET.ni) {
    pattern.ni = 'には、';
  }

  const woItem = (pattern.topic !== TARGET.ni ? '青' : '赤') + pattern.wo;
  const niItem = (pattern.topic !== TARGET.ni ? '赤' : '青') + pattern.ni;
  const items = pattern.isWoFirst ? [woItem, niItem] : [niItem, woItem];
  const sentence = items.join('') + pattern.doushi;
  return sentence;
};
