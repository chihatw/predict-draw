import { IRecordVoiceAsset } from "@/application/recordVoiceAssets/core/0-interface";
import { recordVoiceAssetsActions } from "@/application/recordVoiceAssets/framework/0-reducer";
import { RAW_PATH } from "@/application/recordVoiceParams/core/1-constants";
import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

const RawSaveAsAssetPane = () => {
  const dispatch = useDispatch();
  const recordedPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.recordedPitchStr,
  );
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH],
  );
  const rawBlob = useSelector((state: RootState) => state.recordedAudio.blob);
  const handleSave = async () => {
    if (!rawBlob || !rawAudioBuffer || !rawAudioBuffer.audioBuffer) return;
    const asset: IRecordVoiceAsset = {
      id: nanoid(8),
      startAt: 0,
      stopAt: rawAudioBuffer?.audioBuffer.duration,
      pitchStr: recordedPitchStr,
    };
    dispatch(recordVoiceAssetsActions.addAsset(asset));
  };
  return (
    <Button disabled={!rawBlob} onClick={handleSave}>
      save
    </Button>
  );
};

export default RawSaveAsAssetPane;
