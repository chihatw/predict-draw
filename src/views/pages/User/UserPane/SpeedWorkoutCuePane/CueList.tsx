import React, { useContext, useState } from 'react';

import { AppContext } from '../../../..';
import { SpeedWorkoutParams } from '../../../../../Model';
import { setSpeedWorkoutParams } from '../../../../../services/speedWorkout';
import CueRow from './CueRow';
import { SpeedWorkoutCueState } from './Model';
import NextButton from './NextButton';

const CueList = ({
  state,
  dispatch,
}: {
  state: SpeedWorkoutCueState;
  dispatch: React.Dispatch<SpeedWorkoutCueState>;
}) => {
  const { state: appState } = useContext(AppContext);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClickCheck = (index: number) => {
    setSelectedIndex(index);
    const updatedCheckedIndexes = state.checkedIndexes.concat(index);
    const updatedState: SpeedWorkoutCueState = {
      ...state,
      checkedIndexes: updatedCheckedIndexes,
    };
    dispatch(updatedState);
    const updatedParams: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
      checkedIndexes: updatedCheckedIndexes,
    };
    setSpeedWorkoutParams(updatedParams);
  };

  const handleClickNext = () => {
    setSelectedIndex(-1);
    const updatedCurrentRound = state.currentRound + 1;
    const updatedState: SpeedWorkoutCueState = {
      ...state,
      currentRound: updatedCurrentRound,
      checkedIndexes: [],
    };
    dispatch(updatedState);
    const updatedParams: SpeedWorkoutParams = {
      ...appState.params.speedWorkout,
      currentRound: updatedCurrentRound,
      checkedIndexes: [],
    };
    setSpeedWorkoutParams(updatedParams);
  };

  if (state.isRunning) {
    return (
      <div>
        {state.workout.cues.map((cue, index) => {
          const isActive = selectedIndex === index;
          const isChecked = state.checkedIndexes.includes(index);
          return (
            <CueRow
              key={index}
              cue={cue}
              cueType={state.workout.cueType}
              isActive={isActive}
              isChecked={isChecked}
              handleClick={() => handleClickCheck(index)}
            />
          );
        })}
        {state.isRunning &&
          state.currentRound !== state.totalRounds &&
          state.checkedIndexes.length === state.workout.items.length && (
            <NextButton handleClickNext={handleClickNext} />
          )}
      </div>
    );
  }
  return <></>;
};

export default CueList;
