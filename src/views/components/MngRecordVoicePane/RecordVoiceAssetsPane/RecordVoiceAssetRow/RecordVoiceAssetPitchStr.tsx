import { IRecordVoiceAsset } from "@/application/recordVoiceAssets/core/0-interface";
import { recordVoiceAssetsActions } from "@/application/recordVoiceAssets/framework/0-reducer";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

const RecordVoiceAssetPitchStr = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    dispatch(
      recordVoiceAssetsActions.changePitchStr({
        id: asset.id,
        pitchStr: value,
      }),
    );
  };
  return (
    <Input
      placeholder="pitchStr"
      value={asset.pitchStr}
      autoComplete="off"
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default RecordVoiceAssetPitchStr;
