import StopCircleIcon from '@mui/icons-material/StopCircle';
import MicIcon from '@mui/icons-material/Mic';
import { Container, IconButton } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  blobToAudioBuffer,
  getAudioBufferFromStorage,
} from '../../../../services/utils';
import { AppContext } from '../../../../App';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import { VoiceProps } from '../../../../Model';
import { uploadStorage } from '../../../../repositories/storage';
import { setRecordVoiceRaw } from '../../../../services/recordVoice';
import PlayAudioPane from './PlayAudioPane';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';

const RAW_STORAGE_PATH = '/recordVoice/raw';

const MicTestPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  // streamと連携してマイクを切るため
  const micAudioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const recordVoiceRaw = state.recordVoice.raw;
    if (!recordVoiceRaw.storagePath) {
      setAudioBuffer(null);
      return;
    }
    const fetchData = async () => {
      if (!state.audioContext) return;
      const audioBuffer = await getAudioBufferFromStorage(
        recordVoiceRaw.storagePath,
        state.audioContext
      );
      setAudioBuffer(audioBuffer);
    };
    fetchData();
  }, [state.recordVoice.raw, state.audioContext]);

  const handleClickRecButton = () => {
    const updatedIsRecording = !isRecording;
    if (updatedIsRecording) {
      console.log('start rec');
      startRec();
    } else {
      console.log('stop rec');
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
        storagePath: RAW_STORAGE_PATH,
        pitchStr: '',
      };
      await uploadStorage(blob, RAW_STORAGE_PATH);
      await setRecordVoiceRaw(recordVoiceRaw);

      setAudioBuffer(audioBuffer);
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
  if (!state.audioContext) {
    return <TouchMe />;
  }

  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', paddingTop: 80, rowGap: 40 }}>
        <div>
          <div
            style={{ display: 'flex', justifyContent: 'center', height: 40 }}
          >
            <SentencePitchLine
              pitchesArray={string2PitchesArray(
                state.recordVoice.params.targetPitchStr
              )}
            />
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', height: 136 }}
          >
            <IconButton
              sx={{ color: '#52a2aa' }}
              onClick={handleClickRecButton}
            >
              {isRecording ? (
                <StopCircleIcon sx={{ fontSize: 120 }} />
              ) : (
                <MicIcon sx={{ fontSize: 120 }} />
              )}
            </IconButton>
          </div>
        </div>
        <PlayAudioPane
          audioBuffer={audioBuffer}
          pitchStr={state.recordVoice.raw.pitchStr}
        />
      </div>
    </Container>
  );
};

export default MicTestPane;
