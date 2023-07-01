import { Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { speedWorkoutParamsActions } from 'application/speedWorkoutParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from 'views';
import SpeedWorkoutBPMPane from './SpeedWorkoutBPMPane';
import SpeedWorkoutRow from './SpeedWorkoutRow';

const LOCAL_STORAGE = 'speedWorkkout';

const SpeedWorkoutPane = () => {
  const { state } = useContext(AppContext);
  const dispatch = useDispatch();
  const totalRounds = useSelector(
    (state: RootState) => state.speedWorkoutParams.totalRounds
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  const handleChangeTotalRounds = (totalRounds: number) => {
    dispatch(speedWorkoutParamsActions.changeTotalRounds(totalRounds));
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
              value={totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
              autoComplete='off'
            />
          </div>
          <div>
            {Object.values(state.speedWorkouts).map((workout, index) => (
              <SpeedWorkoutRow workout={workout} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedWorkoutPane;
