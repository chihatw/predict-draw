import { TextField } from '@mui/material';
import { IRecordVoiceAsset } from 'application/recordVoiceAssets/core/0-interface';
import { recordVoiceAssetsActions } from 'application/recordVoiceAssets/framework/0-reducer';
import { useDispatch } from 'react-redux';

const RecordVoiceAssetStopAt = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const handleChange = (input: number) => {
    dispatch(
      recordVoiceAssetsActions.changeStopAt({ id: asset.id, stopAt: input })
    );
  };

  return (
    <TextField
      sx={{ flexBasis: 80 }}
      size='small'
      type='number'
      value={asset.stopAt}
      label='stopAt'
      onChange={(e) => handleChange(Number(e.target.value))}
      inputProps={{ step: 0.1, min: 0 }}
    />
  );
};

export default RecordVoiceAssetStopAt;
