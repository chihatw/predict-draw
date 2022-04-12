import { Check } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  useHandleWorkoutItems,
  useWorkoutItems,
  WorkoutItem,
} from '../../../services/useWorkoutItems';

const MngWorkoutItemsPane = () => {
  const { checkedIndexes } = useWorkoutItems();
  const { setWorkoutItems: setRemoteWorkoutItems, setCheckedIndexes } =
    useHandleWorkoutItems();
  const [workoutItemsStr, setWorkoutItemsStr] = useState('');
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);

  const handleChangeWorkoutItemsStr = (value: string) => {
    setWorkoutItemsStr(value);
    const workoutItems = string2WorkoutItems(value);
    setWorkoutItems(workoutItems);
  };

  const handleClickClear = () => {
    setCheckedIndexes([]);
  };

  const handleSubmit = () => {
    setRemoteWorkoutItems(workoutItems);
  };

  return (
    <div style={{ display: 'grid', rowGap: 40, paddingBottom: 80 }}>
      <Button
        variant='contained'
        sx={{ color: 'white' }}
        onClick={handleClickClear}
      >
        Reset checked indexes
      </Button>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <TextField
          multiline
          label='workoutItemsStr'
          value={workoutItemsStr}
          onChange={(e) => handleChangeWorkoutItemsStr(e.target.value)}
        />
        {workoutItems.map((workoutItem, index) => (
          <WorkoutItemRow
            key={index}
            index={index}
            workoutItem={workoutItem}
            isChecked={checkedIndexes.includes(index)}
          />
        ))}
      </div>
      <Button
        variant='contained'
        sx={{ color: 'white' }}
        onClick={handleSubmit}
      >
        送信
      </Button>
    </div>
  );
};

export default MngWorkoutItemsPane;

const WorkoutItemRow = ({
  index,
  isChecked,
  workoutItem,
}: {
  index: number;
  isChecked: boolean;
  workoutItem: WorkoutItem;
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'grid',
          rowGap: 4,
          flexGrow: 1,
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 12 }}>{`${index + 1}.`}</div>
        <div style={{ fontSize: 14 }}>{workoutItem.text}</div>
        <div style={{ fontSize: 12, color: '#555' }}>{workoutItem.chinese}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isChecked && <Check />}
      </div>
    </div>
  );
};

const string2WorkoutItems = (value: string) => {
  const workoutItems: WorkoutItem[] = [];
  const lines = value.split('\n').filter((i) => i);
  for (let i = 0; i < lines.length; i = i + 3) {
    const text = lines[i] || '';
    const chinese = lines[i + 1] || '';
    const pitchesArray = lines[i + 2] || '';
    const workoutItem: WorkoutItem = {
      text,
      chinese,
      pitchesArray,
    };
    workoutItems.push(workoutItem);
  }
  return workoutItems;
};
