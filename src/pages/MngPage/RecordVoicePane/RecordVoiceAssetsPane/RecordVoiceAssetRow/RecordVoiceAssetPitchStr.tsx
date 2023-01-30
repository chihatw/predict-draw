import { Edit } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
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

  const updateRecordVoiceAsset = () => {
    const updatedAsset: VoiceProps = { ...asset, pitchStr: input };
    setRecordVoiceAsset(updatedAsset);
  };
  return (
    <>
      <TextField
        sx={{ flexGrow: 1 }}
        size='small'
        label='pitchStr'
        value={input}
        autoComplete='off'
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton size='small' onClick={updateRecordVoiceAsset}>
        <Edit />
      </IconButton>
    </>
  );
};

export default RecordVoiceAssetPitchStr;
