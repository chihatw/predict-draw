import { TextField } from '@mui/material';
import { IRecordVoiceAsset } from 'application/recordVoiceAssets/core/0-interface';
import { recordVoiceAssetsActions } from 'application/recordVoiceAssets/framework/0-reducer';
import { useDispatch } from 'react-redux';

const RecordVoiceAssetStartAt = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const handleChange = (input: number) => {
    dispatch(
      recordVoiceAssetsActions.changeStartAt({ id: asset.id, startAt: input })
    );
  };

  return (
    <TextField
      sx={{ flexBasis: 80 }}
      size='small'
      value={asset.startAt}
      type='number'
      onChange={(e) => handleChange(Number(e.target.value))}
      inputProps={{ step: 0.1, min: 0 }}
      label='startAt'
    />
  );
};

export default RecordVoiceAssetStartAt;
