import * as R from 'ramda';
import { Switch } from '@mui/material';
import React, { useContext } from 'react';
import { CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const SwitchFirstNounAlwaysHasHa = () => {
  const { state } = useContext(AppContext);
  const handleChangeFirstNounAlwaysHasHa = async (
    firstNounAlwaysHasHa: boolean
  ) => {
    const updatedParams = R.assocPath<boolean, CueWorkoutParams>(
      ['firstNounAlwaysHasHa'],
      firstNounAlwaysHasHa
    )(state.cueWorkout.params);

    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>1行目は必ず「は」</h4>
      <Switch
        checked={state.cueWorkout.params.firstNounAlwaysHasHa}
        size='small'
        onChange={(_, checked) => handleChangeFirstNounAlwaysHasHa(checked)}
      />
    </>
  );
};

export default SwitchFirstNounAlwaysHasHa;
