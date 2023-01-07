import { Button } from '@mui/material';
import { useState } from 'react';

import SetTime from './SetTime';
import ShowStatus from './ShowStatus';
import SelectVerbs from './SelectVerbs';
import SelectColors from './SelectColors';
import SelectNegativeMode from './SelectNegativeMode';
import SelectHasHeader from './SelectHasHeader';
import SelectShowVerb from './SelectShowVerb';
import JoshiPatternList from './JoshiPatternList';

const CueWorkoutList = () => {
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
        <h3>紙コップ(CueWorkout)</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <ShowStatus />
          <SetTime />
          <SelectColors />
          <SelectVerbs />
          <SelectHasHeader />
          <SelectShowVerb />
          <SelectNegativeMode />
          <JoshiPatternList />
        </div>
      )}
    </div>
  );
};

export default CueWorkoutList;
