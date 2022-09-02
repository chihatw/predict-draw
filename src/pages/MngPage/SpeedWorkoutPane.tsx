import { Button, IconButton, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../App';

import Check from '@mui/icons-material/Check';
import { SpeedWorkoutParams } from '../../Model';
import { setSpeedWorkoutParams } from '../../services/speedWorkout';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const SpeedWorkoutPane = () => {
  const { state } = useContext(AppContext);
  const [selectedId, setSelectedId] = useState('');
  const [open, setOpen] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initializing) return;
    setSelectedId(state.params.speedWorkout.selectedId);
    setInitializing(false);
  }, [initializing]);

  const handleChangeTotalRounds = (totalRounds: number) => {
    const updatedParams: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      totalRounds,
    };
    setSpeedWorkoutParams(updatedParams);
  };

  const handleChangeSelectedId = (newSelectedId: string) => {
    newSelectedId = selectedId !== newSelectedId ? newSelectedId : '';
    setSelectedId(newSelectedId);
    const updatedParams: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      selectedId: newSelectedId,
    };
    setSpeedWorkoutParams(updatedParams);
  };

  const handleOpenEditor = (workoutId: string) => {
    navigate(`/mng/speed/${workoutId}`);
  };

  const handleReset = () => {
    const updatedParams: SpeedWorkoutParams = {
      ...state.params.speedWorkout,
      currentRound: 1,
      checkedIndexes: [],
      isRunning: false,
      updatedAt: new Date().getTime(),
    };
    setSpeedWorkoutParams(updatedParams);
  };

  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Speed</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ flexBasis: 80 }}>bpm</h5>
            <div>{state.params.speedWorkout.bpm}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ flexBasis: 80 }}>isRunning</h5>
            <div>{String(state.params.speedWorkout.isRunning)}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ flexBasis: 80 }}>cueIds</h5>
            <div>{state.params.speedWorkout.checkedIndexes.join(', ')}</div>
          </div>
          <div style={{ padding: '16px 0' }}>
            <TextField
              fullWidth
              size='small'
              type='number'
              label='totalRounds'
              value={state.params.speedWorkout.totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
              autoComplete='off'
            />
          </div>
          <h4>Workouts</h4>
          {Object.values(state.speedWorkouts).map((workout, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}
            >
              <IconButton
                onClick={() => handleChangeSelectedId(workout.id)}
                sx={{ color: selectedId === workout.id ? '#52a2aa' : '#ccc' }}
              >
                <Check />
              </IconButton>
              <div style={{ flexGrow: 1 }}>{workout.label}</div>
              <IconButton onClick={() => handleOpenEditor(workout.id)}>
                <Edit />
              </IconButton>
            </div>
          ))}
          <Button variant='outlined' onClick={handleReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default SpeedWorkoutPane;
