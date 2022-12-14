import { Button } from '@mui/material';
import React, { useState } from 'react';

import SetTime from './SetTime';
import ShowStatus from './ShowStatus';
import SelectVerbs from './SelectVerbs';
import SelectColors from './SelectColors';
import SelectJoshiOrder from './SelectJoshiOrder';
import SwitchFirstNounAlwaysHasHa from './SwitchFirstNounAlswaysHasHa';
import SelectNegativeMode from './SelectNegativeMode';
import SelectPoliteType from './SelectPoliteType';
import SelectHasHeader from './SelectHasHeader';
import SelectGroupingWithHa from './SelectGroupingWithHa';

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
          <SelectPoliteType />
          <SelectHasHeader />
          <SelectColors />
          <SelectVerbs />
          <SelectJoshiOrder />
          <SelectNegativeMode />
          <SelectGroupingWithHa />
          <SwitchFirstNounAlwaysHasHa />
        </div>
      )}
    </div>
  );
};

export default CueWorkoutList;
