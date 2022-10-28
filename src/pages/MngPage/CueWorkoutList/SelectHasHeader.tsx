import * as R from 'ramda';
import { MenuItem, Select } from '@mui/material';
import React, { useContext } from 'react';
import { CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const HEADER_MODES = [
  { value: true, label: '前置き有り' },
  { value: false, label: '前置き無し' },
];

const SelectHasHeader = () => {
  const { state } = useContext(AppContext);
  const handleChangeHasHeader = async (hasHeader: boolean) => {
    const updatedParams = R.assocPath<boolean, CueWorkoutParams>(
      ['hasHeader'],
      hasHeader
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>前置き</h4>
      <Select
        value={String(state.cueWorkout.params.hasHeader)}
        size='small'
        onChange={(e) => {
          const hasHeader = e.target.value === 'true';
          handleChangeHasHeader(hasHeader);
        }}
      >
        {Object.values(HEADER_MODES).map((item, index) => (
          <MenuItem key={index} value={String(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectHasHeader;
