import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../../../..';
import { State, VoiceProps } from '../../../../../../Model';
import { ActionTypes } from '../../../../../../Update';
import { deleteStorage } from '../../../../../../repositories/storage';
import { deleteRecordVoiceAsset } from '../../../../../../services/recordVoice';

const DeleteAssetButton = ({ asset }: { asset: VoiceProps }) => {
  const { state, dispatch } = useContext(AppContext);
  const deleteAsset = () => {
    deleteStorage(asset.storagePath);
    deleteRecordVoiceAsset(asset.id);

    const updatedState = R.compose(
      R.dissocPath<State>(['audioBuffers', asset.storagePath]),
      R.dissocPath<State>(['recordVoice', 'assets', asset.id])
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  };
  return (
    <IconButton size='small' onClick={deleteAsset}>
      <Delete />
    </IconButton>
  );
};

export default DeleteAssetButton;
