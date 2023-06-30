import { useContext } from 'react';
import { AppContext } from '../../../../App';
import { pages } from '../../../../Model';

import CueWorkoutPane from './CueWorkoutPane';
import MicTestPane from './MicTestPane';
import NotePane from './NotePane';
import RecordVoiceListPane from './RecordVoiceListPane';
import SpeedWorkoutCuePane from './SpeedWorkoutCuePane';
import { SpeedWorkoutPane } from './SpeedWorkoutPane';
import SpeedWorkoutReadPane from './SpeedWorkoutReadPane';

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
    case pages.cueWorkout:
      return <CueWorkoutPane />;
    case pages.note:
      return <NotePane />;
    case pages.micTest:
      return <MicTestPane />;
    case pages.recordVoiceList:
      return <RecordVoiceListPane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
