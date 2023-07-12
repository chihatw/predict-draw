import DeleteRawButton from './DeleteRawButton';
import PlayRawPane from './PlayRawPane';
import RawSaveAsAssetPane from './RawSaveAsAssetPane';
import RecordedPitchStrPane from './RecordedPitchStrPane';
import TargetPitchPane from './TargetPitchPane';

const RecordVoiceRawPane = () => {
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TargetPitchPane />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <PlayRawPane />
        <RecordedPitchStrPane />
        <DeleteRawButton />
      </div>
      <RawSaveAsAssetPane />
    </div>
  );
};

export default RecordVoiceRawPane;
