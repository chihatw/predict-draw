import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { CUE_TYPES } from '../../../../services/useWorkouts';

const CueCell = ({
  cue,
  cueType,
  isActive,
}: {
  cue: string;
  cueType: string;
  isActive: boolean;
}) => {
  switch (cueType) {
    case CUE_TYPES.STRING:
      return (
        <div
          style={{
            flexGrow: 1,
            fontSize: 16,
            color: '#52a2aa',
            background: isActive ? 'lightyellow' : 'transparent',
            padding: 4,
            borderRadius: 4,
            marginRight: 16,
          }}
        >
          {cue}
        </div>
      );
    case CUE_TYPES.PITCH:
      return (
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isActive ? 'lightyellow' : 'transparent',
          }}
        >
          <SentencePitchLine pitchesArray={string2PitchesArray(cue)} />
        </div>
      );
    default:
      return <></>;
  }
};

export default CueCell;
