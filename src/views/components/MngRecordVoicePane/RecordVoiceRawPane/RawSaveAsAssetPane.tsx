import { Button } from '@mui/material';
import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { AppContext } from '../../..';
import { VoiceProps } from '../../../../Model';
import { uploadStorage } from '../../../../repositories/storage';
import { setRecordVoiceAsset } from '../../../../services/recordVoice';
import { blobToAudioBuffer } from '../../../../services/utils';

const RawSaveAsAssetPane = ({
  blob,
  rawPitchStr,
}: {
  rawPitchStr: string;
  blob: Blob | null;
}) => {
  const { state } = useContext(AppContext);
  const handleSave = async () => {
    if (!blob) return;
    const id = nanoid(8);
    const storagePath = RECORD_VOICE_STORAGE_PATH + id;
    uploadStorage(blob, storagePath);
    const audioBuffer = await blobToAudioBuffer(blob);
    const recordVoiceAsset: VoiceProps = {
      id,
      startAt: 0,
      stopAt: Math.round(audioBuffer.duration * 100) / 100,
      pitchStr: rawPitchStr,
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
