import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { VoiceProps } from '../../../../../Model';
import { setRecordVoiceAsset } from '../../../../../services/recordVoice';

const RecordVoiceAssetPitchStr = ({ asset }: { asset: VoiceProps }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const pitchStr = asset.pitchStr;
    if (!pitchStr) {
      setInput('');
      return;
    }
    if (!!input) return;
    setInput(pitchStr);
  }, [asset.pitchStr]);

  const handleChange = (input: string) => {
    setInput(input);
    const updatedAsset: VoiceProps = { ...asset, pitchStr: input };
    setRecordVoiceAsset(updatedAsset);
  };
  return (
    <TextField
      sx={{ flexGrow: 1 }}
      size='small'
      label='pitchStr'
      value={input}
      autoComplete='off'
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default RecordVoiceAssetPitchStr;
