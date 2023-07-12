import { RootState } from 'main';
import { useSelector } from 'react-redux';
import RecordVoiceAssetRow from './RecordVoiceAssetRow';

const RecordVoiceAssetsPane = () => {
  const recordVoiceAssetIds = useSelector(
    (state: RootState) => state.recordVoiceAssets.ids
  );
  return (
    <div>
      <div style={{ display: 'grid', rowGap: 8 }}>
        {recordVoiceAssetIds.map((assetId, index) => (
          <RecordVoiceAssetRow key={index} assetId={assetId as string} />
        ))}
      </div>
    </div>
  );
};

export default RecordVoiceAssetsPane;
