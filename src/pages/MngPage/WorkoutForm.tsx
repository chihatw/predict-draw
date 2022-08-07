import { nanoid } from 'nanoid';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useReducer } from 'react';

import { calcBeatCount, string2WorkoutItems } from 'workout-items';
import { Workout } from '../../Model';
import {
  buildInitialWorkoutState,
  CUE_TYPES,
  setWorkout,
} from '../../services/workout';

import { WorkoutActionTypes, workoutReducer } from './Update';
import WorkoutItemList from './WorkoutItemList';
import { ActionTypes } from '../../Update';
import AppContext from '../../services/context';
import { INITIAL_WORKOUT_STATE } from './Model';

const WorkoutForm = ({
  workout,
  callback,
}: {
  workout?: Workout; // create or update
  callback: () => void;
}) => {
  const { dispatch } = useContext(AppContext);
  const [workoutState, workoutDispatch] = useReducer(
    workoutReducer,
    INITIAL_WORKOUT_STATE
  );

  useEffect(() => {
    if (!workout) return;
    const initialState = buildInitialWorkoutState(workout);
    workoutDispatch({
      type: WorkoutActionTypes.initialize,
      payload: initialState,
    });
  }, [workout]);

  const {
    cues,
    label,
    cueStr,
    cueType,
    beatCount,
    workoutItems,
    workoutItemStr,
  } = workoutState;

  const handleChangeLabel = (label: string) => {
    workoutDispatch({ type: WorkoutActionTypes.changeLabel, payload: label });
  };
  const handleChangeBeatCount = (beatCount: number) => {
    workoutDispatch({
      type: WorkoutActionTypes.changeBeatCount,
      payload: beatCount,
    });
  };

  const handleChangeWorkoutItemStr = (workoutItemStr: string) => {
    const workoutItems = string2WorkoutItems(workoutItemStr);
    const beatCount = calcBeatCount(workoutItems);
    const cues = workoutItems.map(({ chinese }) => chinese);
    const cueStr = cues.join('\n');
    workoutDispatch({
      type: WorkoutActionTypes.changeWorkoutItemStr,
      payload: { workoutItemStr, workoutItems, beatCount, cues, cueStr },
    });
  };

  const handleChangeCueType = (cueType: string) => {
    workoutDispatch({
      type: WorkoutActionTypes.changeCueType,
      payload: cueType,
    });
  };

  const handleChangeCueStr = (cueStr: string) => {
    workoutDispatch({ type: WorkoutActionTypes.changeCueStr, payload: cueStr });
    const lines = cueStr.split('\n');
    let cues: string[] = [];
    for (let i = 0; i < workoutItems.length; i++) {
      cues.push(lines[i] || '');
    }
    workoutDispatch({
      type: WorkoutActionTypes.changeCueStr,
      payload: { cues, cueStr },
    });
  };

  const handleSubmit = async () => {
    if (!dispatch) return;

    const newWorkout: Workout = {
      id: workout?.id || nanoid(8),
      cues,
      items: workoutItems,
      label,
      cueType,
      beatCount,
      createdAt: workout?.createdAt || Date.now(),
    };
    dispatch({ type: ActionTypes.setWorkout, payload: newWorkout });
    workoutDispatch({
      type: WorkoutActionTypes.initialize,
      payload: INITIAL_WORKOUT_STATE,
    });
    setWorkout(newWorkout);
    callback();
  };

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TextField
        label='label'
        size='small'
        value={label}
        onChange={(e) => handleChangeLabel(e.target.value)}
      />
      <TextField
        label='beatCount'
        size='small'
        type='number'
        value={beatCount}
        onChange={(e) => handleChangeBeatCount(Number(e.target.value))}
      />
      <TextField
        multiline
        rows={12}
        label='workout items'
        value={workoutItemStr}
        onChange={(e) => {
          handleChangeWorkoutItemStr(e.target.value);
        }}
      />

      <Select
        size='small'
        value={cueType}
        onChange={(e) => handleChangeCueType(e.target.value)}
      >
        {Object.values(CUE_TYPES).map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={cueStr}
        size='small'
        label='cues'
        multiline
        rows={6}
        onChange={(e) => handleChangeCueStr(e.target.value)}
      />
      <WorkoutItemList
        workoutItems={workoutItems}
        cues={cues}
        cueType={cueType}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default WorkoutForm;
