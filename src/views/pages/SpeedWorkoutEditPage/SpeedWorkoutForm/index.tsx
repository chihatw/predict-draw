import { Button, Container, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  buildRemoteSpeedWorkout,
  buildSpeedWorkoutItems,
  buildSpeedWorkoutItemsStr,
} from 'application/speedWorkoutEditPage/core/2-services';
import { speedWorkoutEditPageActions } from 'application/speedWorkoutEditPage/framework/0-reducer';
import { CUE_TYPES } from 'application/speedWorkouts/core/1-constants';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WorkoutItemRow from './WorkoutItemRow';

const SpeedWorkoutForm = ({ workoutId }: { workoutId: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[workoutId]
  );

  const speedWorkoutEditPage = useSelector(
    (state: RootState) => state.speedWorkoutEditPage
  );

  const [value, setValue] = useState({ workoutItemsStr: '', cuesStr: '' });

  useEffect(() => {
    if (!!value.workoutItemsStr) return;
    const _input = buildSpeedWorkoutItemsStr(speedWorkoutEditPage.workoutItems);
    setValue((currentValue) => ({ ...currentValue, workoutItemsStr: _input }));
  }, [speedWorkoutEditPage.workoutItems, value.workoutItemsStr]);

  useEffect(() => {
    const workoutItems = buildSpeedWorkoutItems(value.workoutItemsStr);
    dispatch(speedWorkoutEditPageActions.setWorkoutItems(workoutItems));
  }, [value.workoutItemsStr]);

  useEffect(() => {
    if (!speedWorkout) return;
    dispatch(speedWorkoutEditPageActions.initiate(speedWorkout));
  }, [speedWorkout]);

  const handleChangeLabel = (label: string) => {
    dispatch(speedWorkoutEditPageActions.changeLabel(label));
  };

  const handleChangeCueType = (cueType: string) => {
    dispatch(speedWorkoutEditPageActions.changeCueType(cueType));
  };

  const handleSubmit = () => {
    if (!workoutId) return;
    const remoteSpeedWorkout = buildRemoteSpeedWorkout(speedWorkoutEditPage);
    dispatch(
      speedWorkoutEditPageActions.submit({ workoutId, remoteSpeedWorkout })
    );
    navigate('/mng');
  };

  if (!speedWorkout) return;
  return (
    <Container maxWidth='sm' sx={{ paddingTop: 10, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <div>{`beatCount: ${speedWorkoutEditPage.beatCount}`}</div>
        <TextField
          label='label'
          size='small'
          value={speedWorkoutEditPage.label}
          onChange={(e) => handleChangeLabel(e.target.value)}
        />
        <div
          style={{
            fontSize: 8,
            color: 'gray',
            paddingLeft: '2em',
            paddingBottom: '1em',
          }}
        >
          <div>text</div>
          <div>chinese</div>
          <div>pitchStr</div>
          <div>cuePitchStr</div>
        </div>
        <TextField
          multiline
          rows={12}
          label='workout items'
          value={value.workoutItemsStr}
          onChange={(e) =>
            setValue((currentValue) => ({
              ...currentValue,
              workoutItemsStr: e.target.value,
            }))
          }
        />

        <Select
          size='small'
          value={speedWorkoutEditPage.cueType}
          onChange={(e) => handleChangeCueType(e.target.value)}
        >
          {Object.values(CUE_TYPES).map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <div style={{ display: 'grid', rowGap: 16 }}>
          {speedWorkout.itemTempIds.map((itemTempId, index) => (
            <WorkoutItemRow index={index} key={index} />
          ))}
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};

export default SpeedWorkoutForm;
