import React, { useMemo } from 'react';
import KanaUnit from './KanaUnit';

const KanasRow = ({
  scale,
  isMora,
  pitches,
  isPlaying,
  noteIndex,
  indexOffset,
}: {
  scale?: number;
  isMora: boolean;
  pitches: string[][];
  isPlaying: boolean;
  noteIndex: number;
  indexOffset: number;
}) => {
  return (
    <div style={{ display: 'flex' }}>
      {pitches.map((pitch, index) => (
        <KanaUnitContainer
          key={index}
          index={index}
          pitch={pitch}
          scale={scale}
          isMora={isMora}
          noteIndex={noteIndex}
          nextPitch={pitches[index + 1]}
          isPlaying={isPlaying}
          indexOffset={indexOffset}
        />
      ))}
    </div>
  );
};

export default KanasRow;

const KanaUnitContainer = ({
  index,
  scale,
  pitch,
  isMora,
  noteIndex,
  nextPitch,
  isPlaying,
  indexOffset,
}: {
  index: number;
  pitch: string[];
  scale?: number;
  isMora: boolean;
  nextPitch?: string[];
  noteIndex: number;
  isPlaying: boolean;
  indexOffset: number;
}) => {
  const totalIndex = useMemo(() => indexOffset + index, [indexOffset, index]);
  const isActive = useMemo(
    () =>
      isMora
        ? totalIndex === noteIndex
        : [noteIndex * 2, noteIndex * 2 + 1].includes(totalIndex),
    [isMora, totalIndex, noteIndex]
  );

  const isAccent = useMemo(
    () =>
      // 自身が高音
      !!pitch[1] &&
      // 次にもpitchがある
      !!nextPitch &&
      !!nextPitch[0] &&
      // 次は低音
      !nextPitch[1],
    [pitch, nextPitch]
  );

  return (
    <KanaUnit
      label={pitch[0]}
      height={40 * (scale || 1)}
      isAccent={isAccent}
      isHighPitch={!!pitch[1]}
      hasRightMergin={!!(index % 2)}
      isTextHighlight={!isPlaying || isActive}
      isBackGroundHighlight={isActive}
    />
  );
};
