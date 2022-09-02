import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { CUE_TYPES } from '../../../Model';

const CueCell = ({ cue, cueType }: { cue: string; cueType: string }) => {
  switch (cueType) {
    case CUE_TYPES.STRING:
      return (
        <div
          style={{
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            color: '#52a2aa',
            justifyContent: 'center',
          }}
        >
          {cue}
        </div>
      );
    case CUE_TYPES.PITCH:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowX: 'scroll',
          }}
        >
          <SentencePitchLine pitchesArray={string2PitchesArray(cue)} />
        </div>
      );
    default:
      return <div></div>;
  }
};

export default CueCell;
