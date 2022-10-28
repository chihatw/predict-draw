import * as R from 'ramda';
import { MenuItem, Select } from '@mui/material';
import React, { useContext } from 'react';
import { CueWorkoutParams, JOSHI_ORDER } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const SelectJoshiOrder = () => {
  const { state } = useContext(AppContext);
  const handleChangeJoshiOrder = async (joshiOrder: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['joshiOrder'],
      joshiOrder
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>助詞順序</h4>
      <Select
        value={state.cueWorkout.params.joshiOrder}
        size='small'
        onChange={(e) => handleChangeJoshiOrder(e.target.value)}
      >
        {Object.values(JOSHI_ORDER).map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectJoshiOrder;
