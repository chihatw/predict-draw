import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { CueWorkoutParams } from '../../Model';
import { AppContext } from '../../App';

import {
  createCueFromParams,
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../services/cueWorkout';

const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
const HANDS = ['mine', 'yours'];
const POSITION = ['right', 'left'];
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
  const [open, setOpen] = useState(false);
  const { cueWorkout } = state;
  const { params } = cueWorkout;

  const handleClickColor = async (color: string) => {
    let updatedColors = [...params.colors];
    if (params.colors.includes(color)) {
      updatedColors = params.colors.filter((item) => item !== color);
    } else {
      updatedColors.push(color);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      colors: updatedColors,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleClickHand = async (hand: string) => {
    let updatedHands = [...params.hands];
    if (params.hands.includes(hand)) {
      updatedHands = params.hands.filter((item) => item !== hand);
    } else {
      updatedHands.push(hand);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      hands: updatedHands,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleChangePosition = async (hasPosition: boolean) => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      hasPosition,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleClickVerb = async (verb: string) => {
    let updatedVerbs = [...params.verbs];
    if (params.verbs.includes(verb)) {
      updatedVerbs = params.verbs.filter((item) => item !== verb);
    } else {
      updatedVerbs.push(verb);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      verbs: updatedVerbs,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
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
      isRandom: !params.isRandom,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleChangeIsInverse = async () => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      isInverse: !params.isInverse,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleReset = async () => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      points: 0,
      isRunning: false,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>紙コップ(CueWorkout)</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 80px)',
              alignItems: 'center',
            }}
          >
            <h4>Points</h4>
            <div>{params.points}</div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 100px)',
              alignItems: 'center',
            }}
          >
            <h4>IsRunning</h4>
            <div>{String(params.isRunning)}</div>
          </div>
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
                color={params.colors.includes(color) ? 'primary' : 'secondary'}
                onClick={() => handleClickColor(color)}
              >
                {color}
              </Button>
            ))}
          </div>
          <h4>Hands</h4>
          <div
            style={{
              display: 'grid',
              columnGap: 8,
              gridTemplateColumns: 'repeat(6, 80px)',
            }}
          >
            {HANDS.map((hand) => (
              <Button
                key={hand}
                color={params.hands.includes(hand) ? 'primary' : 'secondary'}
                onClick={() => handleClickHand(hand)}
              >
                {hand}
              </Button>
            ))}
          </div>
          <h4>Position</h4>
          <Switch
            value={params.hasPosition}
            onChange={(_, checked) => handleChangePosition(checked)}
          />
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
                color={params.verbs.includes(verb) ? 'primary' : 'secondary'}
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
            value={params.time}
            onChange={(e) => handleChangeTime(Number(e.target.value))}
          />
          <h4>Is Inverse</h4>
          <Button
            color={params.isInverse ? 'primary' : 'secondary'}
            onClick={handleChangeIsInverse}
          >
            isInverse
          </Button>
          <h4>Is Random</h4>
          <Button
            color={params.isRandom ? 'primary' : 'secondary'}
            onClick={handleChangeIsRandom}
          >
            isRandom
          </Button>
        </div>
      )}
    </div>
  );
};

export default CueWorkoutList;
