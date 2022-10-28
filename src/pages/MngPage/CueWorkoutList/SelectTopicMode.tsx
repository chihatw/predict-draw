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

const SelectTopicMode = () => {
  const { state } = useContext(AppContext);
  const handleChangeTopicMode = async (topicMode: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['topicMode'],
      topicMode
    )(state.cueWorkout.params);
    // トピックの練習をするときは、手と位置は含めない
    if (topicMode !== TOPIC_MODE.noTopic) {
      updatedParams = R.compose(
        R.assocPath<string[], CueWorkoutParams>(['hands'], []),
        R.assocPath<boolean, CueWorkoutParams>(['hasPosition'], false)
      )(updatedParams);
    }
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>トピック</h4>
      <Select
        value={state.cueWorkout.params.topicMode}
        size='small'
        onChange={(e) => handleChangeTopicMode(e.target.value)}
      >
        {Object.values(TOPIC_MODE).map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectTopicMode;
