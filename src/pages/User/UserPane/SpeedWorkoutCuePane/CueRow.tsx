import { Check } from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import React from 'react';
import CueCell from './CueCell';

const CueRow = ({
  cue,
  cueType,
  isChecked,
  isActive,
  handleClick,
}: {
  cue: string;
  cueType: string;
  isChecked: boolean;
  isActive: boolean;
  handleClick: () => void;
}) => {
  return (
    <Collapse in={!isChecked || isActive}>
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
            <CueCell cue={cue} cueType={cueType} isActive={isActive} />
            <Check sx={{ color: isChecked ? '#52a2aa' : '#eee' }} />
          </div>
        </div>
      </Button>
    </Collapse>
  );
};

export default CueRow;
