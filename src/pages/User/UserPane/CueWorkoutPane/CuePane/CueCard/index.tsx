import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import CardCellContainer from './CardCellContainer';

const CueCard = ({ label, pitchStr }: { label: string; pitchStr: string }) => {
  return (
    <div
      style={{
        height: 48,
        boxSizing: 'border-box',
        border: '2px solid #52a2aa',
        borderRadius: 8,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <CardCellContainer>
        <span style={{ fontSize: 24 }}>{label}</span>
      </CardCellContainer>
      <CardCellContainer>
        <SentencePitchLine pitchesArray={string2PitchesArray(pitchStr)} />
      </CardCellContainer>
    </div>
  );
};

export default CueCard;
