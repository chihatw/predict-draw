import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { useDispatch } from 'react-redux';
import SpeedWorkoutForm from './SpeedWorkoutForm';

const SpeedWorkoutEditPage = () => {
  const dispatch = useDispatch();
  const { workoutId } = useParams();

  useEffect(() => {
    dispatch(speedWorkoutsActions.startFetch());
  }, []);

  if (!workoutId) return <></>;

  return <SpeedWorkoutForm workoutId={workoutId} />;
};

export default SpeedWorkoutEditPage;
