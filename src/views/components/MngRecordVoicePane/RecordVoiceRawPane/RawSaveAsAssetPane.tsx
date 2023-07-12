import { Button } from '@mui/material';
import { IRecordVoiceAsset } from 'application/recordVoiceAssets/core/0-interface';
import { RAW_PATH } from 'application/recordVoiceParams/core/1-constants';
import { RootState } from 'main';
import { nanoid } from 'nanoid';
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
    if (!rawAudioBuffer || !rawAudioBuffer.audioBuffer) return;
    const asset: IRecordVoiceAsset = {
      id: nanoid(8),
      startAt: 0,
      stopAt: rawAudioBuffer?.audioBuffer.duration,
      pitchStr: recordedPitchStr,
    };
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
