import { Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../..';
import { SpeedWorkoutParams } from '../../../../Model';
import { setSpeedWorkoutParams } from '../../../../services/speedWorkout';
import SpeedWorkoutBPMPane from './SpeedWorkoutBPMPane';
import SpeedWorkoutList from './SpeedWorkoutList';

const LOCAL_STORAGE = 'speedWorkkout';

const SpeedWorkoutPane = () => {
  const { state } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  const handleChangeTotalRounds = (totalRounds: number) => {
    const updatedParams: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      totalRounds,
    };
    setSpeedWorkoutParams(updatedParams);
  };

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STORAGE, String(updatedOpen));
  };

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <Button
        fullWidth
        sx={{
          color: 'black',
          justifyContent: 'flex-start',
        }}
        onClick={handleClickTitle}
      >
        <h3>速読練習</h3>
      </Button>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div
            style={{
              display: 'flex',
              columnGap: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <SpeedWorkoutBPMPane />
            <TextField
              sx={{ flexBasis: 100 }}
              size='small'
              type='number'
              label='totalRounds'
              value={state.params.speedWorkout.totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
              autoComplete='off'
            />
          </div>
          <SpeedWorkoutList />
        </div>
      )}
    </div>
  );
};

export default SpeedWorkoutPane;
