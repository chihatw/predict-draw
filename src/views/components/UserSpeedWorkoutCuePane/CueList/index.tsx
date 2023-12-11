import { useState } from 'react';

import { speedWorkoutParamsActions } from '@/application/speedWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import CueRow from './CueRow';
import NextButton from './NextButton';

const CueList = () => {
  const dispatch = useDispatch();
  const { selectedId, isRunning, checkedIndexes, currentRound, totalRounds } =
    useSelector((state: RootState) => state.speedWorkoutParams);
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId]
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClickCheck = (index: number) => {
    setSelectedIndex(index);
    dispatch(speedWorkoutParamsActions.checkIndex(index));
  };

  const handleClickNext = () => {
    setSelectedIndex(-1);
    dispatch(speedWorkoutParamsActions.nextRound());
  };

  if (!speedWorkout) return <></>;
  if (isRunning) {
    return (
      <div>
        {speedWorkout.itemTempIds.map((itemTempId, index) => {
          return (
            <CueRow
              key={index}
              index={index}
              isActive={selectedIndex === index}
              handleClick={() => handleClickCheck(index)}
              itemTempId={itemTempId}
            />
          );
        })}
        {isRunning &&
          currentRound !== totalRounds &&
          checkedIndexes.length === speedWorkout.itemTempIds.length && (
            <NextButton handleClickNext={handleClickNext} />
          )}
      </div>
    );
  }
  return <></>;
};

export default CueList;
