import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React from 'react';
import { PitchesArray } from '../../../services/useBpmTrack';

const SentencePitchLines = ({
  pitchesArrayLines,
}: {
  pitchesArrayLines: PitchesArray[];
}) => {
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      {pitchesArrayLines.map((pitchesArray, index) => (
        <SentencePitchLine key={index} hasBorders pitchesArray={pitchesArray} />
      ))}
    </div>
  );
};

export default SentencePitchLines;
