import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import AppContext from '../../services/context';
import { updateTotalRounds } from '../../services/workoutParams';

const StatusPane = () => {
  const { state } = useContext(AppContext);
  const { workoutParams } = state;
  const { totalRounds } = workoutParams;

  const handleReset = () => {
    updateTotalRounds(totalRounds);
  };

  return (
    <div>
      <h3>Status</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ padding: 8, fontSize: 12 }}>
            {Object.entries(workoutParams).map(([key, value], index) => (
              <div key={index}>{`${key}: ${value}`}</div>
            ))}
          </div>
        </div>
        <div>
          <IconButton onClick={handleReset}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default StatusPane;
