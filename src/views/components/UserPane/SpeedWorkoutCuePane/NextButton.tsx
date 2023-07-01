import SyncIcon from '@mui/icons-material/Sync';
import { IconButton } from '@mui/material';
import React from 'react';

const NextButton = ({ handleClickNext }: { handleClickNext: () => void }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <IconButton
        sx={{
          background: '#52a2aa',
          ':hover': { background: '#52a2aa' },
        }}
        onClick={handleClickNext}
      >
        <SyncIcon sx={{ fontSize: 82, color: '#fff' }} />
      </IconButton>
    </div>
  );
};

export default NextButton;
