import { useEffect, useState } from 'react';

import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import {
  COLLECTION,
  DOCID,
  buildSpeedWorkoutParams,
} from 'application/speedWorkoutParams/infrastracture/api';
import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { useDispatch } from 'react-redux';
import SpeedWorkoutForm from './SpeedWorkoutForm';

export const UserSpeedWorkoutPane = () => {
  const dispatch = useDispatch();

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, COLLECTION, DOCID), (docSnapshot) => {
      console.log(`%cfetched ${COLLECTION}`, 'color:red');
      const speedWorkoutParams = buildSpeedWorkoutParams(docSnapshot);
      dispatch(speedWorkoutParamsActions.setParams(speedWorkoutParams));
      if (!speedWorkoutParams.bpm) {
        setElapsedTime(0);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    dispatch(speedWorkoutsActions.startFetch());
  }, []);

  return (
    <SpeedWorkoutForm
      elapsedTime={elapsedTime}
      setElapsedTime={setElapsedTime}
    />
  );
};
