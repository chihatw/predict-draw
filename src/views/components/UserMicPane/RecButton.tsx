import { useRef, useState } from "react";

import {
  clearMediaRecorder,
  createMediaRecorder,
  startRecording,
} from "@/application/audioBuffers/core/2-services";
import { RAW_PATH } from "@/application/recordVoiceParams/core/1-constants";
import { recordVoiceParamsActions } from "@/application/recordVoiceParams/framework/0-reducer";
import { recordedAudioActions } from "@/application/recordedAudio/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { Mic, StopCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const RecButton = () => {
  const dispatch = useDispatch();
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH],
  );
  const [isRecording, setIsRecording] = useState(false);

  // streamと連携してマイクを切るため
  const audioElemRef = useRef(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | undefined>(undefined);

  const start = async () => {
    if (!navigator.mediaDevices) return;

    const mediaRecorder = await createMediaRecorder(
      audioElemRef,
      mediaRecorderRef,
    );

    await startRecording(
      mediaRecorder,
      (blob: Blob, audioBuffer: AudioBuffer) => {
        dispatch(
          recordedAudioActions.setRecordedAudio({
            recordedBlob: blob,
            recordedAudioBuffer: audioBuffer,
          }),
        );
      },
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
    <div style={{ display: "flex", justifyContent: "center", height: 136 }}>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleClick}
        disabled={!!rawAudioBuffer}
        className="h-[120px] w-[120px]"
      >
        {isRecording ? (
          <StopCircle size={120} color="#52a2aa" />
        ) : (
          <Mic size={120} color="#52a2aa" />
        )}
      </Button>
    </div>
  );
};

export default RecButton;
