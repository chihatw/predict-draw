import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  WorkoutItem,
  calcBeatCount,
  string2WorkoutItems,
  workoutItems2String,
} from 'workout-items';
import { CUE_TYPES, Workout } from '../../../../services/useWorkouts';
import { useHandleWorkouts } from '../../../../services/useWorkouts';
import WorkoutItemList from './WorkoutItemList';

const FormPane = ({
  workout,
  callback,
}: {
  workout?: Workout;
  callback: () => void;
}) => {
  const { addWorkout, updateWorkout } = useHandleWorkouts();

  const [label, setLabel] = useState('');
  const [beatCount, setBeatCount] = useState(0);
  const [workoutItemStr, setWorkoutItemStr] = useState('');
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [cueType, setCueType] = useState(CUE_TYPES.STRING);
  const [cueStr, setCueStr] = useState('');
  const [cues, setCues] = useState<string[]>([]);

  useEffect(() => {
    if (!workout) return;
    const { cueType, cues, items, beatCount, label } = workout;
    setLabel(label);
    setBeatCount(beatCount);
    setWorkoutItemStr(workoutItems2String(items));
    setWorkoutItems(items);
    setCueType(cueType);
    setCueStr(cues.join('\n'));
    setCues(cues);
  }, [workout]);

  const resetForm = () => {
    setLabel('');
    setBeatCount(0);
    setWorkoutItemStr('');
    setWorkoutItems([]);
    setCueType(CUE_TYPES.STRING);
    setCueStr('');
    setCues([]);
  };

  const handleChangeWorkoutItemStr = (value: string) => {
    setWorkoutItemStr(value);
    const workoutItems = string2WorkoutItems(value);
    setWorkoutItems(workoutItems);

    const beatCount = calcBeatCount(workoutItems);
    setBeatCount(beatCount);

    const cues = workoutItems.map(({ chinese }) => chinese);
    setCues(cues);

    const cueStr = cues.join('\n');
    setCueStr(cueStr);
  };

  const handleChangeCueStr = (value: string) => {
    setCueStr(value);
    const lines = value.split('\n');
    const cues = workoutItems.map((_, index) => lines[index] || '');
    setCues(cues);
  };

  const handleSubmit = async () => {
    const newWorkout: Workout = {
      id: workout?.id || '',
      cues,
      items: workoutItems,
      label,
      cueType,
      beatCount,
      createdAt: workout?.createdAt || Date.now(),
    };

    let result: Workout | null = null;

    if (!newWorkout.id) {
      const { id, ...omitted } = newWorkout;
      result = await addWorkout(omitted);
    } else {
      result = await updateWorkout(newWorkout);
    }
    if (result) {
      callback();
      resetForm();
    }
  };

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TextField
        label='label'
        size='small'
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <TextField
        label='beatCount'
        size='small'
        type='number'
        value={beatCount}
        onChange={(e) => setBeatCount(Number(e.target.value))}
      />
      <TextField
        multiline
        rows={12}
        label='workout items'
        value={workoutItemStr}
        onChange={(e) => handleChangeWorkoutItemStr(e.target.value)}
      />

      <Select
        size='small'
        value={cueType}
        onChange={(e) => setCueType(e.target.value)}
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

export default FormPane;
