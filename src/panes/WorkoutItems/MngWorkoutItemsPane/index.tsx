import { Check } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  useHandleWorkoutItems,
  useWorkoutItems,
  WorkoutItem,
} from '../../../services/useWorkoutItems';

const MngWorkoutItemsPane = () => {
  const {
    checkedIndexes,
    workoutTime,
    workoutRound,
    liSanWorkoutItemsStr,
    kouSanWorkoutItemsStr,
  } = useWorkoutItems();
  const {
    setWorkoutItems: setRemoteWorkoutItems,
    setCheckedIndexes,
    setWorkoutRound,
    setLiSanWorkoutItemsStr,
    setKouSanWorkoutItemsStr,
  } = useHandleWorkoutItems();

  const [workoutItemsStr, setWorkoutItemsStr] = useState('');
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [totalRounds, setTotalRounds] = useState(0);

  useEffect(() => {
    setTotalRounds(workoutRound.totalRounds);
  }, [workoutRound]);

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

  const handleChangeTotalRounds = (value: number) => {
    setTotalRounds(value);
    const { currentRound } = workoutRound;
    setWorkoutRound({ totalRounds: value, currentRound });
  };

  return (
    <div style={{ display: 'grid', rowGap: 40, paddingBottom: 80 }}>
      <TextField
        type='number'
        value={totalRounds}
        onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
      />
      <Button
        variant='contained'
        sx={{ color: 'white' }}
        onClick={handleClickClear}
      >
        Reset checked indexes
      </Button>
      <div>{`bpm: ${workoutTime.bpm}`}</div>
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
      <WorkoutItemsStrTextField
        label='liSanWorkoutItemsStr'
        setDocument={setLiSanWorkoutItemsStr}
        superInput={liSanWorkoutItemsStr}
      />
      <WorkoutItemsStrTextField
        label='kouSanWorkoutItemsStr'
        setDocument={setKouSanWorkoutItemsStr}
        superInput={kouSanWorkoutItemsStr}
      />
    </div>
  );
};

export default MngWorkoutItemsPane;

const WorkoutItemsStrTextField = ({
  label,
  setDocument,
  superInput,
}: {
  label?: string;
  superInput?: string;
  setDocument?: (value: string) => void;
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!input) {
      setInput(superInput || '');
    }
  }, [superInput]);

  const handleChangeInput = (input: string) => {
    setInput(input);
    !!setDocument && setDocument(input);
  };
  return (
    <TextField
      label={label}
      value={input}
      onChange={(e) => handleChangeInput(e.target.value)}
    />
  );
};

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
