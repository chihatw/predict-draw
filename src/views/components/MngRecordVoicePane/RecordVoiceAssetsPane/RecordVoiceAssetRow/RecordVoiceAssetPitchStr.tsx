import { TextField } from '@mui/material';
import { IRecordVoiceAsset } from 'application/recordVoiceAssets/core/0-interface';
import { recordVoiceAssetsActions } from 'application/recordVoiceAssets/framework/0-reducer';
import { useDispatch } from 'react-redux';

const RecordVoiceAssetPitchStr = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    dispatch(
      recordVoiceAssetsActions.changePitchStr({ id: asset.id, pitchStr: value })
    );
  };
  return (
    <TextField
      sx={{ flexGrow: 1 }}
      size='small'
      label='pitchStr'
      value={asset.pitchStr}
      autoComplete='off'
      onChange={(e) => handleChange(e.target.value)}
      inputProps={{ style: { fontSize: 12 } }}
    />
  );
};

export default RecordVoiceAssetPitchStr;
