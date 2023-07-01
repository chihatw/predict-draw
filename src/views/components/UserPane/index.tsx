import { IPageState } from 'application/pageStates/core/0-interface';
import { PAGES } from 'application/pageStates/core/1-constants';
import { pageStatesActions } from 'application/pageStates/framework/0-reducer';
import { PAGE_STATES_COLLECTION } from 'application/pageStates/infrastructure/api';
import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import {
  DOCID,
  SPEED_WORKOUT_COLLECTION,
  buildSpeedWorkoutParams,
} from 'application/speedWorkoutParams/infrastracture/api';
import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSpeedWorkoutPane from '../UserSpeedWorkoutPane';
import UserSpeedWorkoutReadPane from '../UserSpeedWorkoutReadPane';
import CueWorkoutPane from './CueWorkoutPane';
import MicTestPane from './MicTestPane';
import NotePane from './NotePane';
import SpeedWorkoutCuePane from './SpeedWorkoutCuePane';

const UserPane = ({ user }: { user: string }) => {
  const dispatch = useDispatch();

  const userPageStates = useSelector(
    (state: RootState) => state.pageStates.entities[user]?.state
  );

  useEffect(() => {
    const q = query(collection(db, PAGE_STATES_COLLECTION));
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(`%cfetch ${PAGE_STATES_COLLECTION}`, 'color:red');
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

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, SPEED_WORKOUT_COLLECTION, DOCID),
      (docSnapshot) => {
        console.log(`%cfetched ${SPEED_WORKOUT_COLLECTION}`, 'color:red');
        const speedWorkoutParams = buildSpeedWorkoutParams(docSnapshot);
        dispatch(speedWorkoutParamsActions.setParams(speedWorkoutParams));
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    dispatch(speedWorkoutsActions.startFetch());
  }, []);

  switch (userPageStates) {
    case PAGES.speedWorkoutSolo:
      return <UserSpeedWorkoutPane />;
    case PAGES.speedWorkoutRead:
      return <UserSpeedWorkoutReadPane />;
    case PAGES.speedWorkoutCue:
      return <SpeedWorkoutCuePane />;
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
