import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { VoiceProps } from '../../../../../Model';
import { setRecordVoiceAsset } from '../../../../../services/recordVoice';

const RecordVoiceAssetStartAt = ({ asset }: { asset: VoiceProps }) => {
  const [input, setInput] = useState(0);

  useEffect(() => {
    const startAt = asset.startAt;
    if (!startAt) {
      return;
    }
    if (!!input) return;
    setInput(startAt);
  }, [asset.startAt]);

  const handleChange = (input: number) => {
    setInput(input);
    const updatedAsset: VoiceProps = { ...asset, startAt: input };
    setRecordVoiceAsset(updatedAsset);
  };

  return (
    <TextField
      sx={{ width: 110 }}
      size='small'
      value={input}
      type='number'
      onChange={(e) => handleChange(Number(e.target.value))}
      inputProps={{ step: 0.1, min: 0 }}
      label='startAt'
    />
  );
};

export default RecordVoiceAssetStartAt;
