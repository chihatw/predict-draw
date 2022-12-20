import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React, { useContext } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../../../App';

const TargetPitchPane = () => {
  const { state } = useContext(AppContext);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 40 }}>
      <SentencePitchLine
        pitchesArray={string2PitchesArray(
          state.recordVoice.params.targetPitchStr
        )}
      />
    </div>
  );
};

export default TargetPitchPane;
