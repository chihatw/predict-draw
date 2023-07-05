import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import RecordVoiceAssetsPane from './RecordVoiceAssetsPane';
import RecordVoiceRawPane from './RecordVoiceRawPane';

const LOCAL_STORAGE = 'recordVoice';

const MngRecordVoicePane = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STORAGE, String(updatedOpen));
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          fullWidth
          sx={{ color: 'black', justifyContent: 'flex-start' }}
          onClick={handleClickTitle}
        >
          <h3>Record Voice</h3>
        </Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8, padding: '0 16px' }}>
          <h4>Raw</h4>
          <RecordVoiceRawPane />
          <h4>Assets</h4>
          <RecordVoiceAssetsPane />
        </div>
      )}
    </div>
  );
};

export default MngRecordVoicePane;
