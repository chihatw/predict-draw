import { IRecordVoiceAsset } from "@/application/recordVoiceAssets/core/0-interface";
import { recordVoiceAssetsActions } from "@/application/recordVoiceAssets/framework/0-reducer";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

const RecordVoiceAssetStartAt = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const handleChange = (input: number) => {
    dispatch(
      recordVoiceAssetsActions.changeStartAt({ id: asset.id, startAt: input }),
    );
  };

  return (
    <Input
      className="basis-[100px] p-2"
      value={asset.startAt}
      type="number"
      onChange={(e) => handleChange(Number(e.target.value))}
      placeholder="startAt"
      step={0.1}
      min={0}
    />
  );
};

export default RecordVoiceAssetStartAt;
