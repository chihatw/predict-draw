import { Button } from '@mui/material';
import { cueWorkoutParamsActions } from 'application/cueWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../Model';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';
import { setCueWorkoutCue } from '../../../services/cueWorkout/cueWorkout';
import { toggleElement } from '../../../services/utils';

const SelectColors = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state: RootState) => state.cueWorkoutParams);
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams
  );

  const handleClickColor = async (color: string) => {
    const updatedColors = toggleElement([...colors], color);
    dispatch(cueWorkoutParamsActions.setColors(updatedColors));
    const cue = createCueFromParams(updatedColors, cuePatternParams);
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
            color={colors.includes(color) ? 'primary' : 'secondary'}
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
