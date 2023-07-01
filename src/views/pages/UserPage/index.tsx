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
import { USER_LAYOUTS } from 'application/userPage/core/1-constants';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'views/Layout';
import CueWorkoutPane from '../../components/CueWorkoutPane';
import MicTestPane from '../../components/MicTestPane';
import NotePane from '../../components/NotePane';
import UserSpeedWorkoutCuePane from '../../components/UserSpeedWorkoutCuePane';
import UserSpeedWorkoutPane from '../../components/UserSpeedWorkoutPane';
import UserSpeedWorkoutReadPane from '../../components/UserSpeedWorkoutReadPane';

const UserPage = ({ user }: { user: string }) => {
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

  const content = (() => {
    switch (userPageStates) {
      case PAGES.speedWorkoutSolo:
        return <UserSpeedWorkoutPane />;
      case PAGES.speedWorkoutRead:
        return <UserSpeedWorkoutReadPane />;
      case PAGES.speedWorkoutCue:
        return <UserSpeedWorkoutCuePane />;
      case PAGES.cueWorkout:
        return <CueWorkoutPane />;
      case PAGES.note:
        return <NotePane />;
      case PAGES.micTest:
        return <MicTestPane />;
      default:
        return <div></div>;
    }
  })();

  return <Layout {...USER_LAYOUTS[user]}>{content}</Layout>;
};

export default UserPage;
