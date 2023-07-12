import { Button } from '@mui/material';
import { RAW_PATH } from 'application/recordVoiceParms/core/1-constants';
import { RootState } from 'main';
import { useSelector } from 'react-redux';

const RawSaveAsAssetPane = () => {
  const recordedPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.recordedPitchStr
  );
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH]
  );
  const handleSave = async () => {
    // todo
    // if (!blob) return;
    // const id = nanoid(8);
    // const storagePath = RECORD_VOICE_STORAGE_PATH + id;
    // uploadStorage(blob, storagePath);
    // const audioBuffer = await blobToAudioBuffer(blob);
    // const recordVoiceAsset: VoiceProps = {
    //   id,
    //   startAt: 0,
    //   stopAt: Math.round(audioBuffer.duration * 100) / 100,
    //   pitchStr: rawPitchStr,
    // };
    // setRecordVoiceAsset(recordVoiceAsset);
  };
  return (
    <Button
      size='small'
      variant='contained'
      sx={{ color: 'white' }}
      disabled={!rawAudioBuffer || !rawAudioBuffer.audioBuffer}
      onClick={handleSave}
    >
      save
    </Button>
  );
};

export default RawSaveAsAssetPane;
