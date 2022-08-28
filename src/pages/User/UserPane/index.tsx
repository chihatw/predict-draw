import { path } from 'ramda';
import React, { useContext } from 'react';
import { AppContext } from '../../../App';
import { pages } from '../../../Model';

import { BpmCulc } from './BpmCalcPane';
import CueWorkoutPane from './CueWorkoutPane';
import NotePane from './NotePane';
import RandomWorkoutPane from './RandomWorkoutPane';
import WorkingMemoryPane from './WorkingMemoryPane';
import WorkoutCuePane from './WorkoutCuePane';
import WorkoutReadPane from './WorkoutReadPane';

const UserPane = ({ user }: { user: string }) => {
  const { state } = useContext(AppContext);

  const userStates: { [key: string]: string } = {
    liSan: state.pageStates.liSan,
    kouSan: state.pageStates.kouSan,
    chinSan: state.pageStates.chinSan,
  };

  const pageState = userStates[user] || '';

  switch (pageState) {
    case pages.bpmCalc:
      return <BpmCulc />;
    case pages.workoutCue:
      return <WorkoutCuePane />;
    case pages.workoutRead:
      return <WorkoutReadPane />;
    case pages.randomWorkout:
      return <RandomWorkoutPane />;
    case pages.cueWorkout:
      return <CueWorkoutPane />;
    case pages.workingMemory:
      return <WorkingMemoryPane />;
    case pages.note:
      return <NotePane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
