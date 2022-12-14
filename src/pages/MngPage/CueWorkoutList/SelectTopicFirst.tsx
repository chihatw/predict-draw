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

const SelectTopicFirst = () => {
  const { state } = useContext(AppContext);
  const handleChangeTopicFirst = async (topicFirst: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['topicFirst'],
      topicFirst
    )(state.cueWorkout.params);

    // topicFirst を触ったら
    // firstNounAlwaysHasHa を false にする
    updatedParams = R.assocPath<boolean, CueWorkoutParams>(
      ['firstNounAlwaysHasHa'],
      false
    )(updatedParams);

    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>主題を先に置く</h4>
      <Select
        value={state.cueWorkout.params.topicFirst}
        size='small'
        onChange={(e) => handleChangeTopicFirst(e.target.value)}
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

export default SelectTopicFirst;
