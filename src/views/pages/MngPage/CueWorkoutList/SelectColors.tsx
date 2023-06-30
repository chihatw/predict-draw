import { Button } from '@mui/material';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../..';
import { COLORS, CueWorkoutParams } from '../../../../Model';
import createCueFromParams from '../../../../services/cueWorkout/createCueFromParams';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../../services/cueWorkout/cueWorkout';
import { toggleElement } from '../../../../services/utils';

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

    const cue = createCueFromParams(
      updatedParams.colors,
      updatedParams.patternParams
    );
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
