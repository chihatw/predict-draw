import React from 'react';
import DeleteRawButton from './DeleteRawButton';
import PlayRawPane from './PlayRawPane';
import RawPitchStrPane from './RawPitchStrPane';
import RawSaveAsAssetPane from './RawSaveAsAssetPane';
import TargetPitchPane from './TargetPitchPane';
import TouchedAtPane from './TouchedAtPane';

const RecordVoiceRawPane = () => {
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TargetPitchPane />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <PlayRawPane />
        <RawPitchStrPane />
        <DeleteRawButton />
      </div>
      <TouchedAtPane />
      <RawSaveAsAssetPane />
    </div>
  );
};

export default RecordVoiceRawPane;
