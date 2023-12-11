import { IRecordVoiceAsset } from "@/application/recordVoiceAssets/core/0-interface";
import { recordVoiceAssetsActions } from "@/application/recordVoiceAssets/framework/0-reducer";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

const RecordVoiceAssetStopAt = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const handleChange = (input: number) => {
    dispatch(
      recordVoiceAssetsActions.changeStopAt({ id: asset.id, stopAt: input }),
    );
  };

  return (
    <Input
      className="basis-[100px]"
      type="number"
      value={asset.stopAt}
      placeholder="stopAt"
      onChange={(e) => handleChange(Number(e.target.value))}
      step={0.1}
      min={0}
    />
  );
};

export default RecordVoiceAssetStopAt;
