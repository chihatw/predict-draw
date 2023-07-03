import { useEffect, useState } from 'react';

import { ICuePattern } from 'application/cuePattern/core/0-interface';
import { PATTERNS, TARGET } from 'application/cuePattern/core/1-constants';
import { ICuePatternParams } from 'application/cuePatternParams/core/0-interface';

const useCurrentPatterns = (listState: ICuePatternParams) => {
  const [currentPatterns, setCurrentPatterns] = useState<ICuePattern[]>([]);
  const patterns = PATTERNS;
  useEffect(() => {
    const currentPatterns = buildCurrentPatterns(patterns, listState);
    setCurrentPatterns(currentPatterns);
  }, [listState]);
  return currentPatterns;
};
export default useCurrentPatterns;

export const buildCurrentPatterns = (
  patterns: ICuePattern[],
  listState: ICuePatternParams
) => {
  return (
    patterns
      // 主題
      .filter((pattern) => {
        if (listState.hasWoTopic && pattern.topic === TARGET.wo) {
          return true;
        }
        if (listState.hasNiTopic && pattern.topic === TARGET.ni) {
          return true;
        }
        if (listState.hasNoneTopic && pattern.topic === TARGET.none) {
          return true;
        }
        return false;
      })
      // 分類
      .filter((pattern) => {
        if (listState.hasWoGroping && pattern.grouping === TARGET.wo) {
          return true;
        }
        if (listState.hasNiGroping && pattern.grouping === TARGET.ni) {
          return true;
        }
        if (listState.hasNoneGroping && pattern.grouping === TARGET.none) {
          return true;
        }
        return false;
      })
      // 格順
      .filter((pattern) => {
        if (listState.hasStraightOrder && pattern.isWoFirst) {
          return true;
        }
        if (listState.hasInvertOrder && !pattern.isWoFirst) {
          return true;
        }
        return false;
      })
      // 肯否
      .filter((pattern) => {
        if (listState.hasPositive && !pattern.isNegative) {
          return true;
        }
        if (listState.hasNegative && pattern.isNegative) {
          return true;
        }
        return false;
      })
      // 主題と分類の重複許可
      .filter((pattern) => {
        if (!listState.hasGroupingTopic) {
          if (pattern.topic !== TARGET.none) {
            if (pattern.topic === pattern.grouping) {
              return false;
            }
          }
        }

        return true;
      })
  );
};
