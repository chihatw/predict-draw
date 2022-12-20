import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../../../App';
import { createSourceNode } from '../../../../services/utils';

const RecordVoiceRow = ({ id, index }: { id: string; index: number }) => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const asset = state.recordVoice.assets[id];
  useEffect(() => {
    if (!asset) return;
    const audioBuffer = state.audioBuffers[asset.storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers]);

  if (!asset) return <></>;

  const play = () => {
    if (!state.audioContext || !audioBuffer) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start(0, asset.startAt, asset.stopAt - asset.startAt);
  };

  return (
    <Button variant='outlined' onClick={play}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ flexBasis: 20 }}>{index + 1}</div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <SentencePitchLine
            pitchesArray={string2PitchesArray(asset.pitchStr)}
          />
        </div>
      </div>
    </Button>
  );
};

export default RecordVoiceRow;
