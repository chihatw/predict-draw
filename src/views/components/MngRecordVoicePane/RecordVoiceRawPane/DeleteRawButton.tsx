import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../..';
import { INITIAL_VOICE_PROPS, State, VoiceProps } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import { deleteStorage } from '../../../../repositories/storage';

const DeleteRawButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const deleteRecordVoiceRaw = () => {
    const path = RECORD_VOICE_STORAGE_PATH + 'raw';
    deleteStorage(path);
    const initialRecordVoiceRaw = {
      ...INITIAL_VOICE_PROPS,
      id: 'raw',
    };
    // todo setRecordVoiceRaw(initialRecordVoiceRaw);
    const updatedState = R.compose(
      R.dissocPath<State>(['audioBuffers', path]),
      R.assocPath<VoiceProps, State>(
        ['recordVoice', 'raw'],
        initialRecordVoiceRaw
      )
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  };
  return (
    <IconButton size='small' onClick={deleteRecordVoiceRaw}>
      <Delete />
    </IconButton>
  );
};

export default DeleteRawButton;
