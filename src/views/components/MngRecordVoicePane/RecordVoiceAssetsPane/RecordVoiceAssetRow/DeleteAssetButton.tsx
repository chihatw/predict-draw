import { IRecordVoiceAsset } from "@/application/recordVoiceAssets/core/0-interface";
import { recordVoiceAssetsActions } from "@/application/recordVoiceAssets/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

const DeleteAssetButton = ({ asset }: { asset: IRecordVoiceAsset }) => {
  const dispatch = useDispatch();
  const deleteAsset = () => {
    dispatch(recordVoiceAssetsActions.removeOne(asset.id));
  };
  return (
    <Button variant="ghost" size="icon" onClick={deleteAsset}>
      <Trash2 />
    </Button>
  );
};

export default DeleteAssetButton;
