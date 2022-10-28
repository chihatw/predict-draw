import * as R from 'ramda';
import { MenuItem, Select } from '@mui/material';
import React, { useContext } from 'react';
import { TOPIC_MODE, CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const POLITE_MODES = [
  { value: true, label: '丁寧体' },
  { value: false, label: '普通体' },
];

const SelectPoliteType = () => {
  const { state } = useContext(AppContext);

  const handleChangePoliteType = async (politeType: boolean) => {
    const updatedParams = R.assocPath<boolean, CueWorkoutParams>(
      ['isPoliteType'],
      politeType
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  return (
    <>
      <h4>文体</h4>
      <Select
        value={String(state.cueWorkout.params.isPoliteType)}
        size='small'
        onChange={(e) => {
          const isPoliteType = e.target.value === 'true';
          console.log({ isPoliteType });
          handleChangePoliteType(isPoliteType);
        }}
      >
        {Object.values(POLITE_MODES).map((item, index) => (
          <MenuItem key={index} value={String(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectPoliteType;
