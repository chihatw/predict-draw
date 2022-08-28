import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import Check from '@mui/icons-material/Check';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';

const RhythmListeningAnswerRow = ({
  pitchStr,
  isSelected,
  handleClickRow,
}: {
  pitchStr: string;
  isSelected: boolean;
  handleClickRow: () => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClickRow}
    >
      <div
        style={{
          width: 240,
          display: 'flex',
          borderRadius: 4,
          border: `1px solid ${isSelected ? '#52a2aa' : '#ccc'}`,
          background: isSelected ? 'rgba(82,162,170,0.05)' : '#eee',
        }}
      >
        <div
          style={{
            flexBasis: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isSelected ? '#52a2aa' : '#ccc',
          }}
        >
          <Check />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SentencePitchLine pitchesArray={string2PitchesArray(pitchStr)} />
        </div>
      </div>
    </div>
  );
};

export default RhythmListeningAnswerRow;
