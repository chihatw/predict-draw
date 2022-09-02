import { Button, Container, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { calcBeatCount, string2WorkoutItems } from 'workout-items';
import { AppContext } from '../../App';
import { CUE_TYPES, SpeedWorkout, State } from '../../Model';
import {
  buildSpeedWorkoutEditState,
  setSpeedWorkout,
} from '../../services/speedWorkout';
import { ActionTypes } from '../../Update';
import WorkoutItemList from './WorkoutItemList';
import {
  INITIAL_SPEED_WORKOUT_EDIT_STATE,
  SpeedWorkoutEditState,
} from './Model';

const reducer = (state: SpeedWorkoutEditState, action: SpeedWorkoutEditState) =>
  action;

const SpeedWorkoutEditPage = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [speedWorkoutEditState, speedWorkoutEditDispatch] = useReducer(
    reducer,
    INITIAL_SPEED_WORKOUT_EDIT_STATE
  );

  useEffect(() => {
    if (!workoutId) return;
    const speedWorkoutEditState = buildSpeedWorkoutEditState(state, workoutId);
    speedWorkoutEditDispatch(speedWorkoutEditState);
  }, [workoutId]);

  const handleSubmit = () => {
    if (!workoutId) {
      // todo create new SpeedWorkout
      return;
    }
    const workout = state.speedWorkouts[workoutId];
    if (!workout) return;

    const updatedSpeedWorkout: SpeedWorkout = {
      ...workout,
      cues: speedWorkoutEditState.cues,
      items: speedWorkoutEditState.workoutItems,
      label: speedWorkoutEditState.label,
      cueType: speedWorkoutEditState.cueType,
      beatCount: speedWorkoutEditState.beatCount,
    };
    const updatedSpeedWorkouts = {
      ...state.speedWorkouts,
      [workoutId]: updatedSpeedWorkout,
    };

    const updatedState: State = {
      ...state,
      speedWorkouts: updatedSpeedWorkouts,
    };
    dispatch({ type: ActionTypes.setState, payload: updatedState });

    setSpeedWorkout(updatedSpeedWorkout);

    navigate('/mng');
  };

  return (
    <SpeedWorkoutForm
      state={speedWorkoutEditState}
      dispatch={speedWorkoutEditDispatch}
      handleSubmit={handleSubmit}
    />
  );
};

export default SpeedWorkoutEditPage;

const SpeedWorkoutForm = ({
  state,
  dispatch,
  handleSubmit,
}: {
  state: SpeedWorkoutEditState;
  dispatch: React.Dispatch<SpeedWorkoutEditState>;
  handleSubmit: () => void;
}) => {
  const handleChangeLabel = (label: string) => {
    const updatedState: SpeedWorkoutEditState = { ...state, label };
    dispatch(updatedState);
  };

  const handleChangeWorkoutItemStr = (workoutItemStr: string) => {
    const workoutItems = string2WorkoutItems(workoutItemStr);
    const beatCount = calcBeatCount(workoutItems);
    const updatedState: SpeedWorkoutEditState = {
      ...state,
      beatCount,
      workoutItems,
      workoutItemStr,
    };
    dispatch(updatedState);
  };

  const handleChangeCueType = (cueType: string) => {
    const updatedState: SpeedWorkoutEditState = { ...state, cueType };
    dispatch(updatedState);
  };

  const handleChangeCueStr = (cueStr: string) => {
    const lines = cueStr.split('\n');
    let cues: string[] = [];
    for (let i = 0; i < state.workoutItems.length; i++) {
      cues.push(lines[i] || '');
    }
    const updatedState: SpeedWorkoutEditState = {
      ...state,
      cues,
      cueStr,
    };
    dispatch(updatedState);
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 10, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <div>{`beatCount: ${state.beatCount}`}</div>
        <TextField
          label='label'
          size='small'
          value={state.label}
          onChange={(e) => handleChangeLabel(e.target.value)}
        />
        <TextField
          multiline
          rows={12}
          label='workout items'
          value={state.workoutItemStr}
          onChange={(e) => {
            handleChangeWorkoutItemStr(e.target.value);
          }}
        />

        <Select
          size='small'
          value={state.cueType}
          onChange={(e) => handleChangeCueType(e.target.value)}
        >
          {Object.values(CUE_TYPES).map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <TextField
          value={state.cueStr}
          size='small'
          label='cues'
          multiline
          rows={6}
          onChange={(e) => handleChangeCueStr(e.target.value)}
        />
        <WorkoutItemList
          workoutItems={state.workoutItems}
          cues={state.cues}
          cueType={state.cueType}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};
