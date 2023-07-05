import { IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../..';
import { createSourceNode } from '../../../services/utils';

import PlayArrow from '@mui/icons-material/PlayArrow';

import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { setRecordVoiceLogs } from '../../../services/recordVoice';

const PlayAudioPane = () => {
  const { state } = useContext(AppContext);
  const pitchStr = state.recordVoice.rawPitchStr;
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const storagePath = RECORD_VOICE_STORAGE_PATH + 'raw';

    const audioBuffer = state.audioBuffers[storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers]);

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
        <SentencePitchLine pitchStr={pitchStr} />
      </div>
    </div>
  );
};

export default PlayAudioPane;

const PlayButton = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const { state } = useContext(AppContext);

  const play = () => {
    const audioContext = new AudioContext();
    const sourceNode = createSourceNode(audioBuffer, audioContext);
    sourceNode.start();

    const updatedRecordVoiceLogs: { selected: string } = {
      selected: `raw,${String(Date.now())}`,
    };
    setRecordVoiceLogs(updatedRecordVoiceLogs);
  };
  return (
    <IconButton sx={{ color: '#52a2aa' }} onClick={play}>
      <PlayArrow sx={{ fontSize: 120 }} />
    </IconButton>
  );
};
