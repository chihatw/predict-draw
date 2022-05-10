import React, { useContext } from 'react';
import AppContext from '../../../../services/context';
import { INITIAL_WORKOUT } from '../../../../services/useWorkouts';
import WorkoutItemList from './WorkoutItemList';

const WorkoutPane = () => {
  const { workouts, workoutId } = useContext(AppContext);
  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { label, items, cueType, cues, beatCount } = workout;
  if (!!workout.id) {
    return (
      <div>
        <h3>{label}</h3>
        <div>{`beatCount: ${beatCount}`}</div>
        <WorkoutItemList workoutItems={items} cueType={cueType} cues={cues} />
      </div>
    );
  }
  return <div></div>;
};

export default WorkoutPane;
