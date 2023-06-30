import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../App';
import { SpeedWorkoutParams } from '../../../../Model';
import { setSpeedWorkoutParams } from '../../../../services/speedWorkout';

const SpeedWorkoutBPMPane = () => {
  const { state } = useContext(AppContext);

  const handleReset = () => {
    const updatedParams: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      bpm: 0,
      currentRound: 1,
      checkedIndexes: [],
      isRunning: false,
      updatedAt: new Date().getTime(),
    };

    //  app
    setSpeedWorkoutParams(updatedParams);
  };

  return (
    <div
      style={{
        height: 22,
        display: 'flex',
        flexBasis: 200,
        alignItems: 'center',
        columnGap: 8,
      }}
    >
      <h5 style={{ flexBasis: 80 }}>bpm</h5>
      {state.params.speedWorkout.isRunning ? (
        <div>計測中</div>
      ) : (
        <div>{state.params.speedWorkout.bpm}</div>
      )}
      <IconButton size='small' onClick={handleReset}>
        <Clear color='warning' />
      </IconButton>
    </div>
  );
};

export default SpeedWorkoutBPMPane;
