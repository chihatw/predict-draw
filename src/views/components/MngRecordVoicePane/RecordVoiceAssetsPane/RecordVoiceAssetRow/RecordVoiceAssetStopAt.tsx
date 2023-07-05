import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { VoiceProps } from '../../../../../Model';
import { setRecordVoiceAsset } from '../../../../../services/recordVoice';

const RecordVoiceAssetStopAt = ({ asset }: { asset: VoiceProps }) => {
  const [input, setInput] = useState(0);

  useEffect(() => {
    const stopAt = asset.stopAt;
    if (!stopAt) {
      return;
    }
    if (!!input) return;
    setInput(stopAt);
  }, [asset.stopAt]);

  const handleChange = (input: number) => {
    setInput(input);
    const updatedAsset: VoiceProps = { ...asset, stopAt: input };
    setRecordVoiceAsset(updatedAsset);
  };

  return (
    <TextField
      sx={{ width: 110 }}
      size='small'
      type='number'
      value={input}
      label='stopAt'
      onChange={(e) => handleChange(Number(e.target.value))}
      inputProps={{ step: 0.1, min: 0 }}
    />
  );
};

export default RecordVoiceAssetStopAt;
