import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../../..';
import { INITIAL_VOICE_PROPS, State, VoiceProps } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { deleteStorage } from '../../../../../repositories/storage';
import { setRecordVoiceRaw } from '../../../../../services/recordVoice';

const DeleteRawButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const deleteRecordVoiceRaw = () => {
    deleteStorage(state.recordVoice.raw.storagePath);
    const initialRecordVoiceRaw = {
      ...INITIAL_VOICE_PROPS,
      id: 'raw',
    };
    setRecordVoiceRaw(initialRecordVoiceRaw);
    const updatedState = R.compose(
      R.dissocPath<State>(['audioBuffers', state.recordVoice.raw.storagePath]),
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
