import { PAGES } from 'application/pageStates/core/1-constants';
import { RootState } from 'main';
import { useSelector } from 'react-redux';
import { UserSpeedWorkoutPane } from '../UserSpeedWorkoutPane';
import CueWorkoutPane from './CueWorkoutPane';
import MicTestPane from './MicTestPane';
import NotePane from './NotePane';
import SpeedWorkoutCuePane from './SpeedWorkoutCuePane';
import SpeedWorkoutReadPane from './SpeedWorkoutReadPane';

const UserPane = ({ user }: { user: string }) => {
  const pageStates = useSelector(
    (state: RootState) => state.pageStates.entities
  );

  const pageState = pageStates[user]?.state;

  switch (pageState) {
    case PAGES.speedWorkoutSolo:
      return <UserSpeedWorkoutPane />;
    case PAGES.speedWorkoutCue:
      return <SpeedWorkoutCuePane />;
    case PAGES.speedWorkoutRead:
      return <SpeedWorkoutReadPane />;
    case PAGES.cueWorkout:
      return <CueWorkoutPane />;
    case PAGES.note:
      return <NotePane />;
    case PAGES.micTest:
      return <MicTestPane />;
    default:
      return <div></div>;
  }
};

export default UserPane;
