import pageStates from 'application/pageStates/framework/1-middleware';
import speedWorkoutParams from 'application/speedWorkoutParams/framework/1-middleware';
import speedWorkouts from 'application/speedWorkouts/framework/1-middleware';

export default [...pageStates, ...speedWorkoutParams, ...speedWorkouts];
