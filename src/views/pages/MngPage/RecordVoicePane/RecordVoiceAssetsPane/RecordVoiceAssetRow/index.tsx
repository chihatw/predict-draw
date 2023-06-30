import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../..';
import { VoiceProps } from '../../../../../../Model';
import DeleteAssetButton from './DeleteAssetButton';
import PlayAssetButton from './PlayAssetButton';
import RecordVoiceAssetPitchStr from './RecordVoiceAssetPitchStr';
import RecordVoiceAssetSelectButton from './RecordVoiceAssetSelectButton';
import RecordVoiceAssetSelectTarget from './RecordVoiceAssetSelectTarget';
import RecordVoiceAssetStartAt from './RecordVoiceAssetStartAt';
import RecordVoiceAssetStopAt from './RecordVoiceAssetStopAt';

const RecordVoiceAssetRow = ({
  asset,
  index,
  isTarget,
  handleClick,
  selectTarget,
}: {
  index: number;
  asset: VoiceProps;
  isTarget: boolean;
  handleClick: () => void;
  selectTarget: () => void;
}) => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const audioBuffer = state.audioBuffers[asset.storagePath];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers, asset.storagePath]);
  if (!audioBuffer) return <></>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
      <PlayAssetButton asset={asset} />
      <RecordVoiceAssetSelectButton index={index} handleClick={handleClick} />
      <RecordVoiceAssetSelectTarget
        isTarget={isTarget}
        selectTarget={selectTarget}
      />
      <RecordVoiceAssetPitchStr asset={asset} />
      <RecordVoiceAssetStartAt asset={asset} />
      <RecordVoiceAssetStopAt asset={asset} />
      <DeleteAssetButton asset={asset} />
    </div>
  );
};
export default RecordVoiceAssetRow;
