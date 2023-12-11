import DeleteRawButton from "./DeleteRawButton";
import PlayRawPane from "./PlayRawPane";
import RawSaveAsAssetPane from "./RawSaveAsAssetPane";
import RecordedPitchStrPane from "./RecordedPitchStrPane";
import TargetPitchPane from "./TargetPitchPane";

const RecordVoiceRawPane = () => {
  return (
    <div className="grid gap-2">
      <TargetPitchPane />
      <div className="flex items-center gap-2">
        <PlayRawPane />
        <RecordedPitchStrPane />
        <DeleteRawButton />
      </div>
      <RawSaveAsAssetPane />
    </div>
  );
};

export default RecordVoiceRawPane;
