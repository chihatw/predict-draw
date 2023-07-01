import { IPageState } from 'application/pageStates/core/0-interface';
import { PAGES } from 'application/pageStates/core/1-constants';
import { pageStatesActions } from 'application/pageStates/framework/0-reducer';
import { COLLECTION } from 'application/pageStates/infrastructure/api';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserSpeedWorkoutPane } from '../UserSpeedWorkoutPane';
import CueWorkoutPane from './CueWorkoutPane';
import MicTestPane from './MicTestPane';
import NotePane from './NotePane';
import SpeedWorkoutCuePane from './SpeedWorkoutCuePane';
import SpeedWorkoutReadPane from './SpeedWorkoutReadPane';

const UserPane = ({ user }: { user: string }) => {
  const dispatch = useDispatch();

  const userPageStates = useSelector(
    (state: RootState) => state.pageStates.entities[user]?.state
  );

  useEffect(() => {
    const q = query(collection(db, COLLECTION));
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(`%cfetch ${COLLECTION}`, 'color:red');
      const pageStates: IPageState[] = [];
      querySnapshot.forEach((doc) => {
        const { state } = doc.data();
        pageStates.push({
          id: doc.id,
          state,
        });
      });
      dispatch(pageStatesActions.upsertPageStates(pageStates));
    });
    return () => {
      unsub();
    };
  }, []);

  switch (userPageStates) {
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
