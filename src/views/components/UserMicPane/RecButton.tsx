import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton } from '@mui/material';
import { useRef, useState } from 'react';

import {
  clearMediaRecorder,
  createMediaRecorder,
  startRecording,
} from 'application/audioBuffers/core/2-services';
import { RAW_PATH } from 'application/recordVoiceParms/core/1-constants';
import { recordVoiceParamsActions } from 'application/recordVoiceParms/framework/0-reducer';
import { recordedAudioActions } from 'application/recordedAudio/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';

const RecButton = () => {
  const dispatch = useDispatch();
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH]
  );
  const [isRecording, setIsRecording] = useState(false);

  // streamと連携してマイクを切るため
  const audioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | undefined>(undefined);

  const start = async () => {
    if (!navigator.mediaDevices) return;

    const mediaRecorder = await createMediaRecorder(
      audioElemRef,
      mediaRecorderRef
    );

    await startRecording(
      mediaRecorder,
      (blob: Blob, audioBuffer: AudioBuffer) => {
        dispatch(
          recordedAudioActions.setRecordedAudio({
            recordedBlob: blob,
            recordedAudioBuffer: audioBuffer,
          })
        );
      }
    );

    setIsRecording(true);
  };

  const stop = () => {
    clearMediaRecorder(audioElemRef, mediaRecorderRef);
    setIsRecording(false);
    dispatch(recordVoiceParamsActions.changeHasRaw(true));
  };

  const handleClick = () => {
    if (!isRecording) {
      start();
      return;
    }
    stop();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 136 }}>
      <IconButton
        sx={{ color: '#52a2aa' }}
        onClick={handleClick}
        disabled={!!rawAudioBuffer}
      >
        {isRecording ? (
          <StopCircleIcon sx={{ fontSize: 120 }} />
        ) : (
          <MicIcon sx={{ fontSize: 120 }} />
        )}
      </IconButton>
    </div>
  );
};

export default RecButton;
