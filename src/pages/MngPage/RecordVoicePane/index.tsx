import { Button } from '@mui/material';
import { useState } from 'react';

import RecordVoiceRawPane from './RecordVoiceRawPane';
import RecordVoiceAssetsPane from './RecordVoiceAssetsPane';

const RecordVoicePane = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Record Voice</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <h4>Raw</h4>
          <RecordVoiceRawPane />
          <h4>Assets</h4>
          <RecordVoiceAssetsPane />
        </div>
      )}
    </div>
  );
};

export default RecordVoicePane;
