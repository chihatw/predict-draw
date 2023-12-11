import { audioBuffersActions } from "@/application/audioBuffers/framework/0-reducer";
import { RAW_PATH } from "@/application/recordVoiceParams/core/1-constants";
import { recordVoiceParamsActions } from "@/application/recordVoiceParams/framework/0-reducer";
import { recordedAudioActions } from "@/application/recordedAudio/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

const DeleteRawButton = () => {
  const dispatch = useDispatch();
  const deleteRecordVoiceRaw = () => {
    dispatch(audioBuffersActions.removeAudioBuffer(RAW_PATH));
    dispatch(recordVoiceParamsActions.changeHasRaw(false));
    dispatch(recordedAudioActions.removeBlob());
  };
  return (
    <Button variant="ghost" size="icon" onClick={deleteRecordVoiceRaw}>
      <Trash2 />
    </Button>
  );
};

export default DeleteRawButton;
