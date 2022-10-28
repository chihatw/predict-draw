import * as R from 'ramda';
import { Switch } from '@mui/material';
import React, { useContext } from 'react';
import { TOPIC_MODE, CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const SelectPosition = () => {
  const { state } = useContext(AppContext);
  const handleChangePosition = async (hasPosition: boolean) => {
    let updatedParams = R.assocPath<boolean, CueWorkoutParams>(
      ['hasPosition'],
      hasPosition
    )(state.cueWorkout.params);

    // 位置指定を含める場合、トピックは使わない
    if (hasPosition) {
      updatedParams = R.assocPath<string, CueWorkoutParams>(
        ['topicMode'],
        TOPIC_MODE.noTopic
      )(updatedParams);
    }

    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>一番右・一番左（Position）</h4>
      <Switch
        checked={state.cueWorkout.params.hasPosition}
        onChange={(_, checked) => handleChangePosition(checked)}
      />
    </>
  );
};

export default SelectPosition;
