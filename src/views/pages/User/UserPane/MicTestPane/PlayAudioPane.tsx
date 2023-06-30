import { IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../../App';
import { createSourceNode } from '../../../../../services/utils';

import PlayArrow from '@mui/icons-material/PlayArrow';

import SentencePitchLine from 'views/components/SentencePitchLine';
import { setRecordVoiceLogs } from '../../../../../services/recordVoice';

const PlayAudioPane = () => {
  const { state } = useContext(AppContext);
  const pitchStr = state.recordVoice.raw.pitchStr;
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    if (!state.recordVoice.raw.storagePath) {
      setAudioBuffer(null);
      return;
    }
    const audioBuffer = state.audioBuffers[state.recordVoice.raw.storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers, state.recordVoice.raw.storagePath]);

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
    if (!state.audioContext) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
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