import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../../..';
import { State, VoiceProps } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { deleteStorage } from '../../../../../repositories/storage';
import { deleteRecordVoiceAsset } from '../../../../../services/recordVoice';

const DeleteAssetButton = ({ asset }: { asset: VoiceProps }) => {
  const { state, dispatch } = useContext(AppContext);
  const deleteAsset = () => {
    const path = RECORD_VOICE_STORAGE_PATH + asset.id;
    deleteStorage(path);
    deleteRecordVoiceAsset(asset.id);

    const updatedState = R.compose(
      R.dissocPath<State>(['audioBuffers', path]),
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
