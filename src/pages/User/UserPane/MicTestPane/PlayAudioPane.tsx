import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { createSourceNode } from '../../../../services/utils';
import { AppContext } from '../../../../App';

import PlayArrow from '@mui/icons-material/PlayArrow';

import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';
import { RecordVoice } from '../../../../Model';
import { setRecordVoiceLogs } from '../../../../services/recordVoice';

const PlayAudioPane = ({
  pitchStr,
  audioBuffer,
}: {
  pitchStr: string;
  audioBuffer: AudioBuffer | null;
}) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 136,
          alignItems: 'center',
        }}
      >
        {!!audioBuffer && <PlayButton audioBuffer={audioBuffer} />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SentencePitchLine pitchesArray={string2PitchesArray(pitchStr)} />
      </div>
    </div>
  );
};

export default PlayAudioPane;

const PlayButton = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const { state } = useContext(AppContext);

  const play = () => {
    if (!state.audioContext) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start();

    const updatedRecordVoiceLogs: { selected: string } = {
      selected: String(Date.now()),
    };
    console.log({ updatedRecordVoiceLogs });
    setRecordVoiceLogs(updatedRecordVoiceLogs);
  };
  return (
    <IconButton sx={{ color: '#52a2aa' }} onClick={play}>
      <PlayArrow sx={{ fontSize: 120 }} />
    </IconButton>
  );
};
