import React from 'react';
import KanasRow from './KanasRow';

const BeatKanaTable = ({
  type,
  scale,
  noteIndex,
  isPlaying,
  indexOffsets,
  bpmPitchesArray,
}: {
  type: string;
  scale?: number;
  isPlaying: boolean;
  noteIndex: number;
  indexOffsets: number[];
  bpmPitchesArray: string[][][];
}) => {
  return (
    <div style={{ rowGap: 4, display: 'grid' }}>
      {bpmPitchesArray.map((pitches, index) => (
        <KanasRow
          key={index}
          scale={scale}
          isMora={['mora', 'onebyone'].includes(type)}
          pitches={pitches}
          isPlaying={type !== 'syncopation' && isPlaying}
          noteIndex={type !== 'syncopation' ? noteIndex : -1}
          indexOffset={indexOffsets[index]}
        />
      ))}
    </div>
  );
};

export default BeatKanaTable;
