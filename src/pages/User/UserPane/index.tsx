import React, { useContext } from 'react';
import { AppContext } from '../../../App';
import { pages } from '../../../Model';

import { SpeedWorkoutPane } from './SpeedWorkoutPane';
import CueWorkoutPane from './CueWorkoutPane';
import KanaCardsPane from './KanaCardsPane';
import KanaWorkoutPane from './KanaWorkoutPane';
import NotePane from './NotePane';
import RhythmWorkoutPane from './RhythmWorkoutPane';
import RhythmListPane from './RhythmListPane';
import WorkingMemoryPane from './WorkingMemoryPane';
import SpeedWorkoutCuePane from './SpeedWorkoutCuePane';
import SpeedWorkoutReadPane from './SpeedWorkoutReadPane';
import PitchListPane from './PitchListPane';
import PitchWorkoutPane from './PitchWorkoutPane';
import PitchInputPane from './PitchInputPane';

const UserPane = ({ user }: { user: string }) => {
  const { state } = useContext(AppContext);

  const userStates: { [key: string]: string } = {
    liSan: state.pageStates.liSan,
    kouSan: state.pageStates.kouSan,
    chinSan: state.pageStates.chinSan,
  };

  const pageState = userStates[user] || '';

  switch (pageState) {
    case pages.speedWorkoutSolo:
      return <SpeedWorkoutPane />;
    case pages.speedWorkoutCue:
      return <SpeedWorkoutCuePane />;
    case pages.speedWorkoutRead:
      return <SpeedWorkoutReadPane />;
    // case pages.randomWorkout:
    //   return <RandomWorkoutPane />;
    case pages.cueWorkout:
      return <CueWorkoutPane />;
    case pages.workingMemory:
      return <WorkingMemoryPane />;
    case pages.note:
      return <NotePane />;
    case pages.pitchList:
      return <PitchListPane />;
    case pages.pitchWorkout:
      return <PitchWorkoutPane />;
    case pages.pitchInput:
      return <PitchInputPane />;
    case pages.rhythmList:
      return <RhythmListPane />;
    case pages.rhythmWorkout:
      return <RhythmWorkoutPane />;
    case pages.kanaCards:
      return <KanaCardsPane />;
    case pages.kanaWorkout:
      return <KanaWorkoutPane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
