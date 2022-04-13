import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { ClearRounded, StopCircleRounded } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import React, { useMemo, useEffect, useRef, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import {
  useHandleWorkoutItems,
  useWorkoutItems,
} from '../../../services/useWorkoutItems';

import TimerDisplay from './components/TimerDisplay';
import WorkoutItemRow from './components/WorkoutItemRow';

const WorkoutItemsPane = () => {
  const { workoutItems, checkedIndexes: superCheckedIndexes } =
    useWorkoutItems();

  const beatCount = useMemo(() => {
    const pitchesArrayLines = workoutItems.map((workoutItem) =>
      string2PitchesArray(workoutItem.pitchesArray)
    );
    return Math.ceil(pitchesArrayLines.flat(2).length / 2);
  }, [workoutItems]);

  const { setCheckedIndexes: superSetCheckedIndexes } = useHandleWorkoutItems();
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [currentCheckedIndex, setCurrentCheckedIndex] = useState(-1);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bpm, setBpm] = useState(0);

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
    setBpm(0);
  };

  const handleClickStop = () => {
    stop();
    const bpm = Math.floor(beatCount / (time / 1000 / 60));
    setBpm(bpm);
  };

  return (
    <Container maxWidth='sm'>
      <div
        style={{
          height: 115,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {checkedIndexes.length === workoutItems.length && !isRunning ? (
          <BpmPane bpm={bpm} fontSize={88} />
        ) : (
          <TimerDisplay time={time} />
        )}
      </div>

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
