import { Button, Container, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { calcBeatCount, string2WorkoutItems } from 'workout-items';
import { CUE_TYPES } from '../../../Model';

import { SpeedWorkoutEditState } from '../Model';
import WorkoutItemList from './WorkoutItemList';

const SpeedWorkoutForm = ({
  state,
  dispatch,
  handleSubmit,
}: {
  state: SpeedWorkoutEditState;
  dispatch: React.Dispatch<SpeedWorkoutEditState>;
  handleSubmit: () => void;
}) => {
  const handleChangeLabel = (label: string) => {
    const updatedState: SpeedWorkoutEditState = { ...state, label };
    dispatch(updatedState);
  };

  const handleChangeWorkoutItemStr = (workoutItemStr: string) => {
    console.log({ workoutItemStr });
    const workoutItems = string2WorkoutItems(workoutItemStr);
    console.log({ workoutItems });
    const beatCount = calcBeatCount(workoutItems);
    const updatedState: SpeedWorkoutEditState = {
      ...state,
      beatCount,
      workoutItems,
      workoutItemStr,
    };
    dispatch(updatedState);
  };

  const handleChangeCueType = (cueType: string) => {
    const updatedState: SpeedWorkoutEditState = { ...state, cueType };
    dispatch(updatedState);
  };

  const handleChangeCueStr = (cueStr: string) => {
    const lines = cueStr.split('\n');
    let cues: string[] = [];
    for (let i = 0; i < state.workoutItems.length; i++) {
      cues.push(lines[i] || '');
    }
    const updatedState: SpeedWorkoutEditState = {
      ...state,
      cues,
      cueStr,
    };
    dispatch(updatedState);
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 10, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <div>{`beatCount: ${state.beatCount}`}</div>
        <TextField
          label='label'
          size='small'
          value={state.label}
          onChange={(e) => handleChangeLabel(e.target.value)}
        />
        <TextField
          multiline
          rows={12}
          label='workout items'
          value={state.workoutItemStr}
          onChange={(e) => {
            handleChangeWorkoutItemStr(e.target.value);
          }}
        />

        <Select
          size='small'
          value={state.cueType}
          onChange={(e) => handleChangeCueType(e.target.value)}
        >
          {Object.values(CUE_TYPES).map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <TextField
          value={state.cueStr}
          size='small'
          label='cues'
          multiline
          rows={6}
          onChange={(e) => handleChangeCueStr(e.target.value)}
        />
        <WorkoutItemList
          workoutItems={state.workoutItems}
          cues={state.cues}
          cueType={state.cueType}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};

export default SpeedWorkoutForm;
