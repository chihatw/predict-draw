import { Button } from '@mui/material';
import React, { useState } from 'react';

import SetTime from './SetTime';
import ShowStatus from './ShowStatus';
import SelectVerbs from './SelectVerbs';
import SelectColors from './SelectColors';
import SelectJoshiOrder from './SelectJoshiOrder';
import SelectTopicMode from './SelectTopicMode';
import SelectNegativeMode from './SelectNegativeMode';
import SelectPoliteType from './SelectPoliteType';
import SelectHasHeader from './SelectHasHeader';
// import SelectHand from './SelectHand';
// import SelectPosition from './SelectPosition';

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
          {/* <SelectHand /> */}
          {/* <SelectPosition /> */}
          <SelectJoshiOrder />
          <SelectNegativeMode />
          <SelectTopicMode />
        </div>
      )}
    </div>
  );
};

export default CueWorkoutList;
