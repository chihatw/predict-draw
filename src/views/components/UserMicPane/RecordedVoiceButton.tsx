import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { IconButton } from '@mui/material';
import * as R from 'ramda';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../..';
import { blobToAudioBuffer } from '../../../services/utils';

import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import { RAW_STORAGE_PATH } from '.';
import { State, VoiceProps } from '../../../Model';
import { ActionTypes } from '../../../Update';
import { uploadStorage } from '../../../repositories/storage';

const RecordedVoiceButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  // streamと連携してマイクを切るため
  const micAudioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const path = RECORD_VOICE_STORAGE_PATH + 'raw';
    const audioBuffer = state.audioBuffers[path];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers]);

  const handleClickRecButton = () => {
    const updatedIsRecording = !isRecording;
    if (updatedIsRecording) {
      startRec();
    } else {
      stopRec();
    }
    setIsRecording(updatedIsRecording);
  };

  const startRec = async () => {
    // localhost の場合、 ios chrome では navigator が取得できない
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const mediaRecorder = new MediaRecorder(stream);
    // データが入力された時の処理
    mediaRecorder.ondataavailable = async (event: BlobEvent) => {
      const blob = event.data;
      if (!blob) return;
      const audioBuffer = await blobToAudioBuffer(blob);

      const recordVoiceRaw: VoiceProps = {
        id: 'raw',
        startAt: 0,
        stopAt: 0,
        pitchStr: '',
      };
      uploadStorage(blob, RAW_STORAGE_PATH);
      // todo setRecordVoiceRaw(recordVoiceRaw);
      const updatedState = R.assocPath<AudioBuffer, State>(
        ['audioBuffers', RAW_STORAGE_PATH],
        audioBuffer
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    mediaRecorder.start();

    mediaRecorderRef.current = mediaRecorder;
    // AudioElementと stream を連携
    micAudioElemRef.current.srcObject = stream;
  };
  const stopRec = () => {
    let mediaRecorder = mediaRecorderRef.current;
    let audioElem = micAudioElemRef.current;
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    const stream = audioElem.srcObject as MediaStream;
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    // ブラウザのマイク使用中の表示を消すために必要
    audioElem.srcObject = null;
    mediaRecorder = null;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 136 }}>
      <IconButton
        sx={{ color: '#52a2aa' }}
        onClick={handleClickRecButton}
        disabled={!!audioBuffer}
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

export default RecordedVoiceButton;
