import { Delete } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { PitchListState } from '../../Model';
import { setPitchList } from '../../services/pitchList';

const PitchListPane = () => {
  const { state } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(2, mora), 4);
    if (state.pitchList.mora !== mora) {
      const updatedPitchList: PitchListState = { ...state.pitchList, mora };
      setPitchList(updatedPitchList);
    }
  };
  const handleClearTapped = () => {
    const updatedPitchList: PitchListState = { ...state.pitchList, tapped: [] };
    setPitchList(updatedPitchList);
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
        <h3>Pitch List</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div>
            <h4>tapped</h4>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexGrow: 1 }}>
                {`[${state.pitchList.tapped.map((item) => item).join(', ')}]`}
              </div>
              <IconButton size='small' onClick={handleClearTapped}>
                <Delete />
              </IconButton>
            </div>
          </div>
          <TextField
            fullWidth
            size='small'
            label='mora'
            type='number'
            autoComplete='off'
            value={state.pitchList.mora}
            onChange={(e) => handleChangeMora(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default PitchListPane;
