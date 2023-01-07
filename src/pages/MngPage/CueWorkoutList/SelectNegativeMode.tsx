import * as R from 'ramda';
import { MenuItem, Select } from '@mui/material';
import React, { useContext } from 'react';
import { CueWorkoutParams, NEVER_ALWAYS_RANDOM } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const LABEL = {
  [NEVER_ALWAYS_RANDOM.never]: '全て肯定文',
  [NEVER_ALWAYS_RANDOM.always]: '全て否定文',
  [NEVER_ALWAYS_RANDOM.random]: '肯否混在',
};

const SelectNegativeMode = () => {
  const { state } = useContext(AppContext);
  const handleChangeNegativeSentence = async (negativeSentence: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['negativeSentence'],
      negativeSentence
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>否定</h4>
      <Select
        value={state.cueWorkout.params.negativeSentence}
        size='small'
        onChange={(e) => handleChangeNegativeSentence(e.target.value)}
      >
        {Object.values(NEVER_ALWAYS_RANDOM).map((item, index) => (
          <MenuItem key={index} value={item}>
            {LABEL[item]}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectNegativeMode;
