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

const SelectGroupingWithHa = () => {
  const { state } = useContext(AppContext);
  const handleChangeGroupingWithHa = async (groupingWithHa: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['groupingWithHa'],
      groupingWithHa
    )(state.cueWorkout.params);
    // always, random の時は、

    if (groupingWithHa !== NEVER_ALWAYS_RANDOM.never) {
      // firstNounAlwaysHasHa を false にする
      updatedParams = R.assocPath<boolean, CueWorkoutParams>(
        ['firstNounAlwaysHasHa'],
        false
      )(updatedParams);
    }
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>分類の「は」</h4>
      <Select
        value={state.cueWorkout.params.groupingWithHa}
        size='small'
        onChange={(e) => handleChangeGroupingWithHa(e.target.value)}
      >
        {Object.values(NEVER_ALWAYS_RANDOM).map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectGroupingWithHa;
