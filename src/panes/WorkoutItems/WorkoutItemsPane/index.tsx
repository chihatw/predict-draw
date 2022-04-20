import { BpmPane } from '@chihatw/lang-gym-h.card.ui.bpm-pane';
import { Sync } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  useHandleWorkoutItems,
  useWorkoutItems,
} from '../../../services/useWorkoutItems';
import WorkoutItemRow from './components/WorkoutItemRow';
import WorkoutStatus from '../components/WorkoutStatus';

const WorkoutItemsPane = () => {
  const {
    workoutItems,
    workoutRound,
    workoutTime,
    checkedIndexes: superCheckedIndexes,
  } = useWorkoutItems();

  const { setCheckedIndexes: superSetCheckedIndexes, setWorkoutRound } =
    useHandleWorkoutItems();
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [currentCheckedIndex, setCurrentCheckedIndex] = useState(-1);

  useEffect(() => {
    if (!workoutTime.isRunning) {
      setCheckedIndexes([]);
      setCurrentCheckedIndex(-1);
    }
  }, [workoutTime]);

  const handleClickCheck = (index: number) => {
    const newCheckedIndexes = [...checkedIndexes];
    newCheckedIndexes.push(index);
    setCheckedIndexes(newCheckedIndexes);
    setCurrentCheckedIndex(index);
    superSetCheckedIndexes(newCheckedIndexes);
  };

  const handleClickNextRound = () => {
    const { totalRounds, currentRound } = workoutRound;
    setWorkoutRound({ totalRounds, currentRound: currentRound + 1 });
    setCheckedIndexes([]);
    superSetCheckedIndexes([]);
    setCurrentCheckedIndex(-1);
  };

  return (
    <Container maxWidth='sm' sx={{ marginTop: 3 }}>
      {!workoutTime.isRunning && !!superCheckedIndexes.length ? (
        <BpmPane bpm={workoutTime.bpm} fontSize={88} />
      ) : (
        <div
          style={{
            display: 'flex',

            justifyContent: 'center',
          }}
        >
          <WorkoutStatus />
        </div>
      )}

      <div style={{ display: 'grid', rowGap: 0 }}>
        {workoutTime.isRunning &&
          workoutItems.map((workoutItem, index) => (
            <WorkoutItemRow
              key={index}
              index={index}
              workoutItem={workoutItem}
              handleClick={() => handleClickCheck(index)}
              isChecked={checkedIndexes.includes(index)}
              isCurrentChecked={currentCheckedIndex === index}
            />
          ))}

        {workoutTime.isRunning &&
          workoutRound.currentRound !== workoutRound.totalRounds &&
          checkedIndexes.length === workoutItems.length && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <NextRoundButton handleClickNextRound={handleClickNextRound} />
            </div>
          )}
      </div>
    </Container>
  );
};

export default WorkoutItemsPane;

const NextRoundButton = ({
  handleClickNextRound,
}: {
  handleClickNextRound: () => void;
}) => (
  <IconButton
    sx={{
      background: '#52a2aa',
      ':hover': { background: '#52a2aa' },
    }}
    onClick={handleClickNextRound}
  >
    <Sync sx={{ fontSize: 82, color: '#fff' }} />
  </IconButton>
);
