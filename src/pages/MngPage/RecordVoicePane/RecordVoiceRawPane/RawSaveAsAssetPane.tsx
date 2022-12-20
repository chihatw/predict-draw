import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const RawSaveAsAssetPane = () => {
  const [saveId, setSaveId] = useState('');
  const handleSave = () => {
    // todo
  };
  return (
    <div style={{ display: 'flex', columnGap: 8, alignItems: 'center' }}>
      <TextField
        label='saveId'
        fullWidth
        size='small'
        value={saveId}
        onChange={(e) => setSaveId(e.target.value)}
        autoComplete='off'
      />
      <Button size='small' variant='contained' sx={{ color: 'white' }}>
        save
      </Button>
    </div>
  );
};

export default RawSaveAsAssetPane;
