import cueWorkoutCue from 'application/cueWorkoutCue/framework/1-middleware';
import cueWorkoutParams from 'application/cueWorkoutParams/framework/1-middleware';
import pageStates from 'application/pageStates/framework/1-middleware';
import speedWorkoutItems from 'application/speedWorkoutItems/framework/1-middleware';
import speedWorkoutParams from 'application/speedWorkoutParams/framework/1-middleware';
import speedWorkouts from 'application/speedWorkouts/framework/1-middleware';

export default [
  ...pageStates,
  ...speedWorkoutParams,
  ...speedWorkouts,
  ...speedWorkoutItems,
  ...cueWorkoutParams,
  ...cueWorkoutCue,
];
