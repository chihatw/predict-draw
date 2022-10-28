import * as R from 'ramda';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { VERBS, CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import { toggleElement } from '../../../services/utils';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const SelectVerbs = () => {
  const { state } = useContext(AppContext);
  const handleClickVerb = async (verb: string) => {
    const updatedVerbs = toggleElement(
      [...state.cueWorkout.params.verbs],
      verb
    );

    const updatedParams = R.assocPath<string[], CueWorkoutParams>(
      ['verbs'],
      updatedVerbs
    )(state.cueWorkout.params);

    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>Verbs</h4>
      <div
        style={{
          display: 'grid',
          columnGap: 8,
          gridTemplateColumns: 'repeat(6, 80px)',
        }}
      >
        {VERBS.map((verb) => (
          <Button
            key={verb}
            color={
              state.cueWorkout.params.verbs.includes(verb)
                ? 'primary'
                : 'secondary'
            }
            onClick={() => handleClickVerb(verb)}
          >
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {verb}
            </span>
          </Button>
        ))}
      </div>
    </>
  );
};

export default SelectVerbs;
