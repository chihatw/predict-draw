import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { IRecordVoiceAsset } from 'application/recordVoiceAssets/core/0-interface';
import { recordVoiceAssetsActions } from 'application/recordVoiceAssets/framework/0-reducer';
import { useDispatch } from 'react-redux';

const DeleteAssetButton = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const deleteAsset = () => {
    dispatch(recordVoiceAssetsActions.removeOne(asset.id));
  };
  return (
    <IconButton size='small' onClick={deleteAsset}>
      <Delete />
    </IconButton>
  );
};

export default DeleteAssetButton;
