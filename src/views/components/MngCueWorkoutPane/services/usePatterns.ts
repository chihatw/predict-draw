import { ICuePattern } from 'application/cuePattern/core/0-interface';
import { TARGET, initialState } from 'application/cuePattern/core/1-constants';
import { useMemo } from 'react';
import { KAKU_ORDERS, SENTENCE_TYPES } from '../../../../Model';

const usePatterns = () => {
  const patterns = useMemo(() => {
    const patterns: ICuePattern[] = [];
    for (const topicType of Object.keys(TARGET)) {
      for (const groupingType of Object.keys(TARGET)) {
        for (const kakuOrder of Object.keys(KAKU_ORDERS)) {
          for (const sentenceType of Object.keys(SENTENCE_TYPES)) {
            const pattern = { ...initialState };

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

const buildSentence = (pattern: ICuePattern) => {
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
