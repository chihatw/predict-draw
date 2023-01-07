import * as R from 'ramda';
import { MenuItem, Select } from '@mui/material';
import { useContext } from 'react';
import { CueWorkoutParams, SHOW_VERB } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const LABEL = {
  [SHOW_VERB.hide]: '動詞非表示',
  [SHOW_VERB.show]: '動詞表示',
  [SHOW_VERB.showBoth]: '動詞肯否定両表示',
};

const SelectShowVerb = () => {
  const { state } = useContext(AppContext);

  const handleChangeShowVerb = async (showVerb: string) => {
    const updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['showVerb'],
      showVerb
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  return (
    <>
      <h4>動詞表示</h4>
      <Select
        value={state.cueWorkout.params.showVerb}
        size='small'
        onChange={(e) => handleChangeShowVerb(e.target.value)}
      >
        {[SHOW_VERB.hide, SHOW_VERB.show, SHOW_VERB.showBoth].map(
          (item, index) => (
            <MenuItem key={index} value={item}>
              {LABEL[item]}
            </MenuItem>
          )
        )}
      </Select>
    </>
  );
};

export default SelectShowVerb;
