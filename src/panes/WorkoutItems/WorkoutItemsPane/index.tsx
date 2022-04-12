import { ClearRounded, StopCircleRounded } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {
  useHandleWorkoutItems,
  useWorkoutItems,
} from '../../../services/useWorkoutItems';
import TimerDisplay from './components/TimerDisplay';
import WorkoutItemRow from './components/WorkoutItemRow';

const WorkoutItemsPane = () => {
  const { workoutItems, checkedIndexes: superCheckedIndexes } =
    useWorkoutItems();
  const { setCheckedIndexes: superSetCheckedIndexes } = useHandleWorkoutItems();
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [currentCheckedIndex, setCurrentCheckedIndex] = useState(-1);

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const startAtRef = useRef(0);
  const rafRef = useRef(0);

  const start = () => {
    startAtRef.current = performance.now();
    loop();
    setIsRunning(true);
  };

  const loop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    setTime(elapsedTime);
    rafRef.current = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    setTime(elapsedTime);
    window.cancelAnimationFrame(rafRef.current);
    setIsRunning(false);
  };

  useEffect(() => {
    setCheckedIndexes(superCheckedIndexes);
  }, [superCheckedIndexes]);

  const handleClickCheck = (index: number) => {
    const newCheckedIndexes = [...checkedIndexes];
    newCheckedIndexes.push(index);
    setCheckedIndexes(newCheckedIndexes);
    setCurrentCheckedIndex(index);
    superSetCheckedIndexes(newCheckedIndexes);
    if (newCheckedIndexes.length === 1) {
      start();
    }
  };

  const handleClickReset = () => {
    setCheckedIndexes([]);
    superSetCheckedIndexes([]);
    setCurrentCheckedIndex(-1);
    setTime(0);
  };

  const handleClickStop = () => {
    stop();
  };

  return (
    <Container maxWidth='sm'>
      <TimerDisplay time={time} />
      <div style={{ display: 'grid', rowGap: 0 }}>
        {workoutItems.map((workoutItem, index) => (
          <WorkoutItemRow
            key={index}
            index={index}
            workoutItem={workoutItem}
            handleClick={() => handleClickCheck(index)}
            isChecked={checkedIndexes.includes(index)}
            isCurrentChecked={currentCheckedIndex === index}
          />
        ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isRunning ? (
            <IconButton onClick={handleClickStop}>
              <StopCircleRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
            </IconButton>
          ) : (
            !!checkedIndexes.length && (
              <IconButton onClick={handleClickReset}>
                <ClearRounded sx={{ fontSize: 120, color: '#52a2aa' }} />
              </IconButton>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default WorkoutItemsPane;
