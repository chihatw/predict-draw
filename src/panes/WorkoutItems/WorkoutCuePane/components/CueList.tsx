import React, { useContext } from 'react';
import AppContext from '../../../../services/context';
import { useHandleWorkoutItems } from '../../../../services/useWorkoutItems';
import { INITIAL_WORKOUT } from '../../../../services/useWorkouts';
import CueRow from './CueRow';

const CueList = ({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
}) => {
  const { workouts, workoutId, workoutTime, checkedIndexes } =
    useContext(AppContext);

  const { setCheckedIndexes } = useHandleWorkoutItems();

  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { cues, cueType } = workout;
  const { isRunning } = workoutTime;

  const handleClickCheck = (index: number) => {
    setCurrentIndex(index);
    setCheckedIndexes(checkedIndexes.concat([index]));
  };

  if (isRunning) {
    return (
      <div>
        {cues.map((cue, index) => (
          <CueRow
            key={index}
            cue={cue}
            cueType={cueType}
            isActive={currentIndex === index}
            isChecked={checkedIndexes.includes(index)}
            handleClick={() => handleClickCheck(index)}
          />
        ))}
      </div>
    );
  }
  return <></>;
};

export default CueList;
