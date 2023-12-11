import { RootState } from "@/main";
import { useSelector } from "react-redux";
import DeleteAssetButton from "./DeleteAssetButton";
import PlayAssetButton from "./PlayAssetButton";
import RecordVoiceAssetPitchStr from "./RecordVoiceAssetPitchStr";
import RecordVoiceAssetStartAt from "./RecordVoiceAssetStartAt";
import RecordVoiceAssetStopAt from "./RecordVoiceAssetStopAt";

const RecordVoiceAssetRow = ({ assetId }: { assetId: string }) => {
  const recordVoiceAsset = useSelector(
    (state: RootState) => state.recordVoiceAssets.entities[assetId],
  );
  if (!recordVoiceAsset) return <></>;
  return (
    <div style={{ display: "flex", alignItems: "center", columnGap: 8 }}>
      <PlayAssetButton asset={recordVoiceAsset} />
      <RecordVoiceAssetPitchStr asset={recordVoiceAsset} />
      <RecordVoiceAssetStartAt asset={recordVoiceAsset} />
      <RecordVoiceAssetStopAt asset={recordVoiceAsset} />
      <DeleteAssetButton asset={recordVoiceAsset} />
    </div>
  );
};
export default RecordVoiceAssetRow;
