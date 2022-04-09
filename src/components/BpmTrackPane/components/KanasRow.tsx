import React from 'react';
import KanaUnit from './KanaUnit';

const KanasRow = ({
  scale,
  isMora,
  startAt,
  pitches,
  isPlaying,
  activeIndex,
}: {
  scale?: number;
  isMora: boolean;
  pitches: string[][];
  startAt: number;
  isPlaying: boolean;
  activeIndex: number;
}) => (
  <>
    {pitches.map((pitch, pitchIndex) => {
      const index = startAt + pitchIndex;
      const isActive = isMora
        ? index === activeIndex
        : [activeIndex * 2, activeIndex * 2 + 1].includes(index);
      const isAccent =
        // ターゲットが高音
        !!pitch[1] &&
        // ターゲットの次にもpitchがある
        !!pitches[pitchIndex + 1] &&
        !!pitches[pitchIndex + 1][0] &&
        // ターゲットの次は低音
        !pitches[pitchIndex + 1][1];

      return (
        <KanaUnit
          key={pitchIndex}
          label={pitch[0]}
          height={40 * (scale || 1)}
          isAccent={isAccent}
          isHighPitch={!!pitch[1]}
          isTextHighlight={!isPlaying || isActive}
          isBackGroundHighlight={isActive}
          hasRightMergin={!!(pitchIndex % 2)}
        />
      );
    })}
  </>
);

export default KanasRow;
