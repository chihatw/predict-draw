import * as R from 'ramda';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { blobToAudioBuffer } from '../../../../services/utils';
import { AppContext } from '../../../../App';

import { State, VoiceProps } from '../../../../Model';
import { uploadStorage } from '../../../../repositories/storage';
import { setRecordVoiceRaw } from '../../../../services/recordVoice';
import { RAW_STORAGE_PATH } from '.';
import { ActionTypes } from '../../../../Update';

const RecordVoiceButton = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  // streamと連携してマイクを切るため
  const micAudioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!state.recordVoice.raw.storagePath) {
      setAudioBuffer(null);
      return;
    }
    const audioBuffer = state.audioBuffers[state.recordVoice.raw.storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers, state.recordVoice.raw.storagePath]);

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
      if (!state.audioContext || !blob) return;
      const audioBuffer = await blobToAudioBuffer(blob, state.audioContext);

      const recordVoiceRaw: VoiceProps = {
        id: 'raw',
        startAt: 0,
        stopAt: 0,
        pitchStr: '',
        storagePath: RAW_STORAGE_PATH,
      };
      uploadStorage(blob, RAW_STORAGE_PATH);
      setRecordVoiceRaw(recordVoiceRaw);
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

export default RecordVoiceButton;
