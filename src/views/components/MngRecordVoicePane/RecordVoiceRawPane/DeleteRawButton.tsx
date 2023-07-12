import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { audioBuffersActions } from 'application/audioBuffers/framework/0-reducer';
import { RAW_PATH } from 'application/recordVoiceParms/core/1-constants';
import { recordVoiceParamsActions } from 'application/recordVoiceParms/framework/0-reducer';
import { useDispatch } from 'react-redux';

const DeleteRawButton = () => {
  const dispatch = useDispatch();
  const deleteRecordVoiceRaw = () => {
    dispatch(audioBuffersActions.removeAudioBuffer(RAW_PATH));
    dispatch(recordVoiceParamsActions.changeHasRaw(false));
  };
  return (
    <IconButton size='small' onClick={deleteRecordVoiceRaw}>
      <Delete />
    </IconButton>
  );
};

export default DeleteRawButton;
