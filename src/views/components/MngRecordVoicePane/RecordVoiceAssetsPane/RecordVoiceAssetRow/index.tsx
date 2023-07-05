import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../..';
import { VoiceProps } from '../../../../../Model';
import DeleteAssetButton from './DeleteAssetButton';
import PlayAssetButton from './PlayAssetButton';
import RecordVoiceAssetPitchStr from './RecordVoiceAssetPitchStr';
import RecordVoiceAssetStartAt from './RecordVoiceAssetStartAt';
import RecordVoiceAssetStopAt from './RecordVoiceAssetStopAt';

const RecordVoiceAssetRow = ({
  asset,
}: // index,
// isTarget,
// handleClick,
// selectTarget,
{
  // index: number;
  asset: VoiceProps;
  // isTarget: boolean;
  // handleClick: () => void;
  // selectTarget: () => void;
}) => {
  const { state } = useContext(AppContext);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const path = RECORD_VOICE_STORAGE_PATH + asset.id;
    const audioBuffer = state.audioBuffers[path];
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers, asset.id]);
  if (!audioBuffer) return <></>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
      <PlayAssetButton asset={asset} />
      {/* <RecordVoiceAssetSelectButton index={index} handleClick={handleClick} /> */}
      {/* <RecordVoiceAssetSelectTarget
        isTarget={isTarget}
        selectTarget={selectTarget}
      /> */}
      <RecordVoiceAssetPitchStr asset={asset} />
      <RecordVoiceAssetStartAt asset={asset} />
      <RecordVoiceAssetStopAt asset={asset} />
      <DeleteAssetButton asset={asset} />
    </div>
  );
};
export default RecordVoiceAssetRow;
