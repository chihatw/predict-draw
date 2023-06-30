import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { AppContext } from '../../../../../App';
import { VoiceProps } from '../../../../../Model';
import { uploadStorage } from '../../../../../repositories/storage';
import { setRecordVoiceAsset } from '../../../../../services/recordVoice';
import { blobToAudioBuffer } from '../../../../../services/utils';

const RawSaveAsAssetPane = ({
  blob,
  rawPitchStr,
}: {
  rawPitchStr: string;
  blob: Blob | null;
}) => {
  const { state } = useContext(AppContext);
  const handleSave = async () => {
    if (!blob || !state.audioContext) return;
    const id = nanoid(8);
    const storagePath = `/recordVoice/${id}`;
    uploadStorage(blob, storagePath);
    const audioBuffer = await blobToAudioBuffer(blob, state.audioContext);
    const recordVoiceAsset: VoiceProps = {
      id,
      startAt: 0,
      stopAt: Math.round(audioBuffer.duration * 100) / 100,
      pitchStr: rawPitchStr,
      storagePath,
    };
    setRecordVoiceAsset(recordVoiceAsset);
  };
  return (
    <Button
      size='small'
      variant='contained'
      sx={{ color: 'white' }}
      disabled={!blob}
      onClick={handleSave}
    >
      save
    </Button>
  );
};

export default RawSaveAsAssetPane;
