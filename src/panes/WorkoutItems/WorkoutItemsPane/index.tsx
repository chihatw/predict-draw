import { Check } from '@mui/icons-material';
import { Button, Container, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  useHandleWorkoutItems,
  useWorkoutItems,
  WorkoutItem,
} from '../../../services/useWorkoutItems';

const WorkoutItemsPane = () => {
  const { workoutItems, checkedIndexes: superCheckedIndexes } =
    useWorkoutItems();
  const { setCheckedIndexes: superSetCheckedIndexes } = useHandleWorkoutItems();
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  useEffect(() => {
    setCheckedIndexes(superCheckedIndexes);
  }, [superCheckedIndexes]);

  const handleClickCheck = (index: number) => {
    const newCheckedIndexes = [...checkedIndexes];
    newCheckedIndexes.push(index);
    setCheckedIndexes(newCheckedIndexes);
    superSetCheckedIndexes(newCheckedIndexes);
  };

  const handleClickReset = () => {
    setCheckedIndexes([]);
    superSetCheckedIndexes([]);
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 16, padding: '0 16px' }}>
        {workoutItems.map((workoutItem, index) => (
          <WorkoutItemRow
            key={index}
            index={index}
            workoutItem={workoutItem}
            handleClick={() => handleClickCheck(index)}
            isChecked={checkedIndexes.includes(index)}
          />
        ))}
        <Divider />
        <Button
          variant='contained'
          sx={{ color: 'white' }}
          onClick={handleClickReset}
        >
          リセット
        </Button>
      </div>
    </Container>
  );
};

export default WorkoutItemsPane;

const WorkoutItemRow = ({
  index,
  isChecked,
  workoutItem,
  handleClick,
}: {
  index: number;
  isChecked: boolean;
  workoutItem: WorkoutItem;
  handleClick: () => void;
}) => {
  return (
    <Button
      sx={{ color: '#555', background: isChecked ? '#eee' : 'transparent' }}
      style={{
        display: 'flex',

        padding: '8px 16px',
        borderRadius: 8,
        textAlign: 'left',
      }}
      disabled={isChecked}
      onClick={handleClick}
    >
      <div
        style={{
          display: 'grid',
          rowGap: 4,
          flexGrow: 1,
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 14 }}>{`${index + 1}.${workoutItem.text}`}</div>
        <div style={{ fontSize: 16, color: '#52a2aa' }}>
          {workoutItem.chinese}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: isChecked ? '#52a2aa' : '#eee' }}>
          <Check />
        </span>
      </div>
    </Button>
  );
};
