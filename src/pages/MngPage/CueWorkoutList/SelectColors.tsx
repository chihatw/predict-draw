import * as R from 'ramda';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../../App';
import { COLORS, CueWorkoutParams } from '../../../Model';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import { toggleElement } from '../../../services/utils';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const SelectColors = () => {
  const { state } = useContext(AppContext);

  const handleClickColor = async (color: string) => {
    const updatedColors = toggleElement(
      [...state.cueWorkout.params.colors],
      color
    );
    const updatedParams = R.assocPath<string[], CueWorkoutParams>(
      ['colors'],
      updatedColors
    )(state.cueWorkout.params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  return (
    <>
      <h4>色</h4>
      <div
        style={{
          display: 'grid',
          columnGap: 8,
          gridTemplateColumns: 'repeat(6, 80px)',
        }}
      >
        {COLORS.map((color) => (
          <Button
            key={color}
            color={
              state.cueWorkout.params.colors.includes(color)
                ? 'primary'
                : 'secondary'
            }
            onClick={() => handleClickColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SelectColors;
