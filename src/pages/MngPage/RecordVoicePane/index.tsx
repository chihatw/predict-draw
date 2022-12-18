import * as R from 'ramda';

import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../../../App';

import RecordVoiceRawPane from './RecordVoiceRawPane';

const RecordVoicePane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(true); //debug

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
        </div>
      )}
    </div>
  );
};

export default RecordVoicePane;
