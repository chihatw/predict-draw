import { Check } from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import React from 'react';
import { WorkoutItem } from '../../../../services/useWorkoutItems';

const WorkoutItemRow = ({
  index,
  isChecked,
  workoutItem,
  isCurrentChecked,
  handleClick,
}: {
  index: number;
  isChecked: boolean;
  workoutItem: WorkoutItem;
  isCurrentChecked: boolean;
  handleClick: () => void;
}) => {
  return (
    <Collapse in={!isChecked || isCurrentChecked}>
      <Button
        fullWidth
        sx={{
          color: '#555',
          padding: '8px 16px',
          textAlign: 'left',
          margin: '8px 0',
        }}
        disabled={isChecked}
        onClick={handleClick}
      >
        <div
          style={{
            display: 'grid',
            rowGap: 4,
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                flexGrow: 1,
                fontSize: 16,
                color: '#52a2aa',
                background: isCurrentChecked ? 'lightyellow' : 'transparent',
                padding: 4,
                borderRadius: 4,
                marginRight: 16,
              }}
            >
              {workoutItem.chinese}
            </div>
            <Check sx={{ color: isChecked ? '#52a2aa' : '#eee' }} />
          </div>
        </div>
      </Button>
    </Collapse>
  );
};

export default WorkoutItemRow;
