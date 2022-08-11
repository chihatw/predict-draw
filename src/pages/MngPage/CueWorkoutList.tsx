import { Button, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { CueWorkoutParams } from '../../Model';
import AppContext from '../../services/context';
import { setCueWorkoutParams } from '../../services/cueWorkout';

const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
const VERBS = [
  'motsu',
  'yubisasu',
  'hikkurikaesu',
  'ireru',
  'noseru',
  'kabuseru',
];

const CueWorkoutList = () => {
  const { state } = useContext(AppContext);
  const { cueWorkout } = state;
  const { params } = cueWorkout;
  const { colors, verbs, points, time, isRandom, isRunning } = params;

  const handleClickColor = async (color: string) => {
    let updatedColors = [...colors];
    if (colors.includes(color)) {
      updatedColors = colors.filter((item) => item !== color);
    } else {
      updatedColors.push(color);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      colors: updatedColors,
    };
    await setCueWorkoutParams(updatedParams);
  };
  const handleClickVerb = async (verb: string) => {
    let updatedVerbs = [...verbs];
    if (verbs.includes(verb)) {
      updatedVerbs = colors.filter((item) => item !== verb);
    } else {
      updatedVerbs.push(verb);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      verbs: updatedVerbs,
    };
    await setCueWorkoutParams(updatedParams);
  };

  const handleChangeTime = async (time: number) => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      time,
    };
    await setCueWorkoutParams(updatedParams);
  };

  const handleChangeIsRandom = async () => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      isRandom: !isRandom,
    };
    await setCueWorkoutParams(updatedParams);
  };

  const handleReset = async () => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      points: 0,
      isRunning: false,
    };
    await setCueWorkoutParams(updatedParams);
  };

  return (
    <div>
      <h3>CueWorkout</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 80px)',
          alignItems: 'center',
          margin: '-20px 0',
        }}
      >
        <h4>Points</h4>
        <div>{points}</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 100px)',
          alignItems: 'center',
          margin: '-20px 0',
        }}
      >
        <h4>IsRunning</h4>
        <div>{String(isRunning)}</div>
      </div>
      <div style={{ height: 20 }} />
      <Button fullWidth variant='outlined' onClick={handleReset}>
        reset
      </Button>
      <h4>Colors</h4>
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
            color={verbs.includes(verb) ? 'primary' : 'secondary'}
            onClick={() => handleClickVerb(verb)}
          >
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {verb}
            </span>
          </Button>
        ))}
      </div>
      <h4>Time</h4>
      <TextField
        fullWidth
        size='small'
        type='number'
        value={time}
        onChange={(e) => handleChangeTime(Number(e.target.value))}
      />
      <h4>Is Random</h4>
      <Button
        color={isRandom ? 'primary' : 'secondary'}
        onClick={handleChangeIsRandom}
      >
        isRandom
      </Button>
    </div>
  );
};

export default CueWorkoutList;
