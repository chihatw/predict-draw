import { Button, IconButton, TextField } from '@mui/material';

import React, { useContext, useState } from 'react';

import { AppContext } from '../../App';
import { RhythmListState } from '../../Model';
import { setRhythmList } from '../../services/rhythmList';
import Delete from '@mui/icons-material/Delete';

const KANAS: { [key: string]: string } = {
  tattata: 'タッタタ',
  taatata: 'タータタ',
  tantata: 'タンタタ',
  tatatata: 'タタタタ',
  tatatta: 'タタッタ',
  tataata: 'タタータ',
  tatanta: 'タタンタ',
  tatatax: 'タタタッ',
  tatataa: 'タタター',
  tatatan: 'タタタン',
  tattaa: 'タッター',
  taataa: 'ターター',
  tantaa: 'タンター',
  tattan: 'タッタン',
  taatan: 'タータン',
  tantan: 'タンタン',
};

const RhythmListPane = () => {
  const { state } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(1, mora), 3);
    if (state.rhythmList.mora !== mora) {
      const updatedRhythmList: RhythmListState = { ...state.rhythmList, mora };
      setRhythmList(updatedRhythmList);
    }
  };
  const handleClearTapped = () => {
    const updatedRhythmList: RhythmListState = {
      ...state.rhythmList,
      tapped: [],
    };
    setRhythmList(updatedRhythmList);
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
        <h3>Rhythm List</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div>
            <h4>tapped</h4>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexGrow: 1 }}>
                {`[${state.rhythmList.tapped
                  .map((item) => KANAS[item] || item)
                  .join(', ')}]`}
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
            value={state.rhythmList.mora}
            onChange={(e) => handleChangeMora(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default RhythmListPane;
