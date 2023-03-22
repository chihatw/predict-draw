import { Button } from '@mui/material';
import { useContext } from 'react';
import { CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const ShowStatus = () => {
  const { state } = useContext(AppContext);
  const handleReset = async () => {
    const updatedParams: CueWorkoutParams = {
      ...state.cueWorkout.params,
      points: 0,
      isRunning: false,
    };
    await setCueWorkoutParams(updatedParams);

    const cue = createCueFromParams(
      updatedParams.colors,
      updatedParams.patternParams
    );
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 80px)',
          alignItems: 'center',
        }}
      >
        <h4>Points</h4>
        <div>{state.cueWorkout.params.points}</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 100px)',
          alignItems: 'center',
        }}
      >
        <h4>IsRunning</h4>
        <div>{String(state.cueWorkout.params.isRunning)}</div>
      </div>
      <Button fullWidth variant='outlined' onClick={handleReset}>
        reset
      </Button>
    </>
  );
};

export default ShowStatus;
