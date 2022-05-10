import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import {
  INITIAL_WORKOUT_ROUND,
  INITIAL_WORKOUT_TIME,
  useHandleWorkoutItems,
} from '../../../../services/useWorkoutItems';
import AppContext from '../../../../services/context';

const StatusPane = () => {
  const { workoutTime, checkedIndexes, workoutRound, workoutId } =
    useContext(AppContext);
  const { setWorkoutTime, setCheckedIndexes, setWorkoutRound } =
    useHandleWorkoutItems();

  return (
    <div>
      <h3>Status</h3>
      <StatusRow
        label='workoutTime'
        obj={workoutTime}
        resetStatus={() => setWorkoutTime(INITIAL_WORKOUT_TIME)}
      />
      <StatusRow
        label='checkedIndexes'
        list={checkedIndexes}
        resetStatus={() => setCheckedIndexes([])}
      />
      <StatusRow
        label='workoutRound'
        obj={workoutRound}
        resetStatus={() => setWorkoutRound(INITIAL_WORKOUT_ROUND)}
      />
    </div>
  );
};

const StatusRow = ({
  obj,
  list,
  label,
  resetStatus,
}: {
  obj?: { [key: string]: string | number | boolean };
  list?: number[];
  label: string;
  resetStatus: () => void;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexGrow: 1 }}>
        <div>{label}</div>
        <div style={{ padding: 8, fontSize: 12 }}>
          {!!obj &&
            Object.entries(obj).map(([key, value], index) => (
              <div key={index}>{`${key}: ${value}`}</div>
            ))}
          {!!list && <div>{JSON.stringify(list)}</div>}
        </div>
      </div>
      <div>
        <IconButton onClick={resetStatus}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default StatusPane;
